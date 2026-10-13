import type { InputEntry } from '../utils/gamepad';

type InputHistoryProps = {
  entries: InputEntry[];
  onClear: () => void;
};

export function InputHistory({ entries, onClear }: InputHistoryProps) {
  return (
    <section aria-label="Historial de inputs" className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Historial de inputs (últimos 14)</h2>
        <button onClick={onClear} className="rounded border border-slate-700 px-2 py-1 text-[10px] font-bold text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200">LIMPIAR</button>
      </div>
      {entries.length === 0 ? (
        <p className="font-mono text-sm text-slate-600">Presiona botones para registrar...</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {entries.map((entry) => (
            <span
              key={entry.id}
              className="group relative rounded border border-slate-800 bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-slate-400"
            >
              {entry.label}
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {entry.time}
              </span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
