import { ConnectionStatus } from './components/ConnectionStatus';
import { GamepadVisualizer } from './components/GamepadVisualizer';
import { InputHistory } from './components/InputHistory';
import { useGamepad } from './hooks/useGamepad';

export default function App() {
  const { gamepads, activeButtons, history, setHistory, socd } = useGamepad();
  const gamepad = gamepads[0];

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 p-6 font-sans text-slate-100">
      <header className="mb-8 w-full max-w-4xl text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-4xl font-black tracking-wider text-transparent">
          FGC GAMEPAD TESTER
        </h1>
        <p className="mt-1 text-sm text-slate-400">Laboratorio de hardware y limpieza de ejecución (FGC)</p>
      </header>
      <main className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
        <ConnectionStatus gamepad={gamepad} />
        {gamepad && (
          <>
            <GamepadVisualizer buttons={activeButtons} socd={socd} />
            <InputHistory entries={history} onClear={() => setHistory([])} />
          </>
        )}
      </main>
    </div>
  );
}
