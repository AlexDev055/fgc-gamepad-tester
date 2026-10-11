import { useEffect, useRef, useState } from 'react';
import { buttonMap, formatTime, getSocdStatus, type SocdStatus } from '../utils/gamepad';

export function useGamepad() {
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [activeButtons, setActiveButtons] = useState<boolean[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [socd, setSocd] = useState<SocdStatus>(null);
  const lastButtonsRef = useRef<boolean[]>([]);
  const sessionStartRef = useRef(0);

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
        setGamepads((previous) => previous.length === 0 ? previous : []);
        setActiveButtons((previous) => previous.length === 0 ? previous : []);
        setSocd((previous) => previous === null ? previous : null);
        lastButtonsRef.current = [];
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

        const newPresses = buttons.flatMap((pressed, index) =>
          pressed && !lastButtonsRef.current[index] ? [index] : [],
        );
        if (newPresses.length > 0) {
          const labels = newPresses.map((index) => buttonMap[index] ?? `B${index}`).join('+');
          const elapsed = performance.now() - sessionStartRef.current;
          setHistory((previous) => [`${labels} · ${formatTime(elapsed)}`, ...previous].slice(0, 14));
        }

        lastButtonsRef.current = buttons;
        const nextSocd = getSocdStatus(buttons);
        setSocd((previous) => previous === nextSocd ? previous : nextSocd);
      }
      animationFrameId = requestAnimationFrame(pollGamepads);
    };

    animationFrameId = requestAnimationFrame(pollGamepads);
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { gamepads, activeButtons, history, setHistory, socd };
}
