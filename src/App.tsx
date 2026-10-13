import { useState } from 'react';
import { ConnectionStatus } from './components/ConnectionStatus';
import { GamepadVisualizer } from './components/GamepadVisualizer';
import { InputHistory } from './components/InputHistory';
import { useGamepad } from './hooks/useGamepad';

type TabId = 'controller' | 'minigame' | 'nat';

const tabs: { id: TabId; label: string }[] = [
  { id: 'controller', label: 'Mando' },
  { id: 'minigame', label: 'Minijuego' },
  { id: 'nat', label: 'NAT Checker' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('controller');
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
      <main className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-md">
        <nav aria-label="Herramientas" className="flex border-b border-slate-800 bg-slate-950/60 px-4 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="p-6" role="tabpanel">
          {activeTab === 'controller' && (
            <>
              <ConnectionStatus gamepad={gamepad} />
              {gamepad && (
                <>
                  <GamepadVisualizer buttons={activeButtons} socd={socd} />
                  <InputHistory entries={history} onClear={() => setHistory([])} />
                </>
              )}
            </>
          )}
          {activeTab === 'minigame' && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-8 text-center">
              <h2 className="text-lg font-bold text-slate-200">Minijuego</h2>
              <p className="mt-2 text-sm text-slate-400">Aquí podrás añadir después un reto de ejecución con el mando.</p>
            </div>
          )}
          {activeTab === 'nat' && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-8 text-center">
              <h2 className="text-lg font-bold text-slate-200">NAT Checker</h2>
              <p className="mt-2 text-sm text-slate-400">Aquí podrás añadir después la herramienta de diagnóstico de conexión.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
