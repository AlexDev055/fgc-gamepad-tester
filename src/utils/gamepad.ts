export interface InputEntry {
  id: string;
  label: string;
  time: string;
}

export const buttonMap: Record<number, string> = {
  0: 'A', 1: 'B', 2: 'X', 3: 'Y',
  4: 'LB', 5: 'RB', 6: 'LT', 7: 'RT',
  8: 'Select', 9: 'Start', 10: 'L3', 11: 'R3',
  12: '↑', 13: '↓', 14: '←', 15: '→', 16: 'Home',
};

export const actionButtonOrder = [2, 3, 5, 4, 0, 1, 7, 6];

export function formatTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
  const centiseconds = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
}

export type SocdStatus = 'updown' | 'leftright' | 'both' | null;

export function getSocdStatus(buttons: boolean[]): SocdStatus {
  const upDown = Boolean(buttons[12] && buttons[13]);
  const leftRight = Boolean(buttons[14] && buttons[15]);
  if (upDown && leftRight) return 'both';
  if (upDown) return 'updown';
  if (leftRight) return 'leftright';
  return null;
}