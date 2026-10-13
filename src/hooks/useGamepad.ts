import { useEffect, useRef, useState } from 'react';
import { buttonMap, formatTime, getSocdStatus, type InputEntry, type SocdStatus } from '../utils/gamepad';


export function useGamepad() {
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [activeButtons, setActiveButtons] = useState<boolean[]>([]);
  const [history, setHistory] = useState<InputEntry[]>([]);
  const [socd, setSocd] = useState<SocdStatus>(null);

  // 1. Los useRef se declaran aquí arriba (nivel superior del hook)
  const lastButtonsRef = useRef<boolean[]>([]);
  const sessionStartRef = useRef(0);
  const pendingPressesRef = useRef<Set<number>>(new Set());
  const groupTimerRef = useRef<number | null>(null);
  
  const debounceMs = 40; // Constante fuera del loop

  useEffect(() => {
    let animationFrameId = 0;
    let isRunning = true;
    sessionStartRef.current = performance.now();

    const pollGamepads = () => {
      if (!isRunning) return;
      
      const connectedGamepads = Array.from(navigator.getGamepads?.() ?? [])
        .filter((gamepad): gamepad is Gamepad => gamepad !== null);
      const gamepad = connectedGamepads[0];

      if (!gamepad) {
        setGamepads((previous) => (previous.length === 0 ? previous : []));
        setActiveButtons((previous) => (previous.length === 0 ? previous : []));
        setSocd((previous) => (previous === null ? previous : null));
        lastButtonsRef.current = [];
        pendingPressesRef.current.clear();
        if (groupTimerRef.current !== null) {
          window.clearTimeout(groupTimerRef.current);
          groupTimerRef.current = null;
        }
      } else {
        const buttons = gamepad.buttons.map((button) => button.pressed);
        
        setGamepads((previous) =>
          previous.length === connectedGamepads.length && previous[0]?.id === gamepad.id
            ? previous
            : connectedGamepads,
        );
        
        setActiveButtons((previous) =>
          previous.length === buttons.length && previous.every((value, index) => value === buttons[index])
            ? previous
            : buttons,
        );

        // Detección de nuevas pulsaciones
        const newPresses = buttons.flatMap((pressed, index) =>
          pressed && !lastButtonsRef.current[index] ? [index] : [],
        );

        if (newPresses.length > 0) {
          for (const index of newPresses) {
            pendingPressesRef.current.add(index);
          }

          if (groupTimerRef.current !== null) {
            window.clearTimeout(groupTimerRef.current);
          }

          groupTimerRef.current = window.setTimeout(() => {
            const indices = [...pendingPressesRef.current].sort((a, b) => a - b);
            const labels = indices.map((index) => buttonMap[index] ?? `B${index}`).join('+');
            const elapsed = performance.now() - sessionStartRef.current;

            setHistory((previous) => [
              { id: `${performance.now()}-${indices.join('-')}`, label: labels, time: formatTime(elapsed) },
              ...previous,
            ].slice(0, 14));

            pendingPressesRef.current.clear();
            groupTimerRef.current = null;
          }, debounceMs);
        }

        lastButtonsRef.current = buttons;
        const nextSocd = getSocdStatus(buttons);
        setSocd((previous) => (previous === nextSocd ? previous : nextSocd));
      }

      animationFrameId = requestAnimationFrame(pollGamepads);
    };

    animationFrameId = requestAnimationFrame(pollGamepads);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);

      if (groupTimerRef.current !== null) {
        window.clearTimeout(groupTimerRef.current);
      }
    };
  }, []);

  return { gamepads, activeButtons, history, setHistory, socd };
}
