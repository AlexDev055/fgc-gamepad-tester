type InputHistoryProps = {
  entries: string[];
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
          {entries.map((entry, index) => (
            <span key={`${entry}-${index}`} className={`rounded border px-2.5 py-1.5 font-mono text-xs ${index === 0 ? 'border-cyan-700 bg-cyan-950/60 font-bold text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
              {entry}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
