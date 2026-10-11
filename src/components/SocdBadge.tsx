import type { SocdStatus } from '../utils/gamepad';

type SocdBadgeProps = {
  status: SocdStatus;
};

const badgeByStatus = {
  clean: { text: 'SOCD ✓ LIMPIO', className: 'bg-emerald-950/50 border-emerald-800 text-emerald-400' },
  updown: { text: '⚠ ↑+↓ SIMULTÁNEOS', className: 'bg-red-950/50 border-red-800 text-red-400' },
  leftright: { text: '⚠ ←+→ SIMULTÁNEOS', className: 'bg-red-950/50 border-red-800 text-red-400' },
  both: { text: '⚠ DOBLE PAR OPUESTO', className: 'bg-red-950/50 border-red-800 text-red-400' },
  waiting: { text: 'SOCD: SIN DATOS', className: 'bg-slate-800/50 border-slate-700 text-slate-500' },
};

export function SocdBadge({ status }: SocdBadgeProps) {
  const badge = badgeByStatus[status ?? 'clean'];
  return <span className={`rounded border px-2 py-1 text-[10px] font-bold ${badge.className}`}>{badge.text}</span>;
}
