type ConnectionStatusProps = {
  gamepad: Gamepad | undefined;
};

export function ConnectionStatus({ gamepad }: ConnectionStatusProps) {
  if (!gamepad) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-center font-semibold text-red-400 animate-pulse">
        ⚠️ Conecta tu control USB / Leverless y presiona cualquier botón para comenzar...
      </div>
    );
  }
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 text-sm">
      <span className="text-slate-400">Dispositivo activo</span>
      <span className="font-mono font-bold text-emerald-400">{gamepad.id}</span>
    </div>
  );
}
