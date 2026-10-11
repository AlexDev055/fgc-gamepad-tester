import { actionButtonOrder, buttonMap } from '../utils/gamepad';
import { SocdBadge } from './SocdBadge';

type GamepadVisualizerProps = {
  buttons: boolean[];
  socd: 'updown' | 'leftright' | 'both' | null;
};

export function GamepadVisualizer({ buttons, socd }: GamepadVisualizerProps) {
  const isPressed = (index: number) => buttons[index] ?? false;
  const directionClass = (index: number) => isPressed(index)
    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
    : 'bg-slate-900 border-slate-800 text-slate-400';

  return (
    <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-800 bg-slate-950/50 p-6 md:grid-cols-2">
      <section aria-label="Movimiento y SOCD">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Movimiento (SOCD Check)</h2>
          <SocdBadge status={socd} />
        </div>
        <div className="grid max-w-[240px] grid-cols-3 gap-2">
          <div className={`rounded-lg border p-4 text-center font-bold transition-all ${directionClass(14)}`}>←</div>
          <div className={`rounded-lg border p-4 text-center font-bold transition-all ${directionClass(13)}`}>↓</div>
          <div className={`rounded-lg border p-4 text-center font-bold transition-all ${directionClass(15)}`}>→</div>
        </div>
        <div className="mt-2 max-w-[240px]">
          <div className={`rounded-lg border p-4 text-center font-bold transition-all ${isPressed(12) ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>↑</div>
        </div>
      </section>
      <section aria-label="Botones del mando">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Acciones / Botones</h2>
        <div className="grid grid-cols-4 gap-2">
          {actionButtonOrder.map((index) => (
            <div key={index} className={`flex h-16 items-center justify-center rounded-lg border font-mono font-bold transition-all ${isPressed(index) ? 'scale-95 border-pink-400 bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
              {buttonMap[index] ?? `B${index}`}
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {[8, 9, 10, 11, 16].map((index) => (
            <div key={index} className={`flex h-8 items-center justify-center rounded border text-[10px] font-mono font-bold transition-all ${isPressed(index) ? 'border-amber-400 bg-amber-500/80 text-slate-950' : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
              {buttonMap[index]}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
