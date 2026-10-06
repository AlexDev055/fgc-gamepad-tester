import { useEffect, useState } from 'react';

export default function App() {
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [activeButtons, setActiveButtons] = useState<boolean[]>([]);

  useEffect(() => {
    const pollGamepads = () => {
      const gps = navigator.getGamepads ? navigator.getGamepads() : [];
      const activeGps = Array.from(gps).filter((gp): gp is Gamepad => gp !== null);
      
      if (activeGps.length > 0) {
        setGamepads(activeGps);
        setActiveButtons(activeGps[0].buttons.map(b => b.pressed));
      }
      requestAnimationFrame(pollGamepads);
    };

    const animId = requestAnimationFrame(pollGamepads);
    return () => cancelAnimationFrame(animId);
  }, []);
  const buttonMap: { [key: number]: string } = {
    0: 'A',
    1: 'B',
    2: 'X',
    3: 'Y',
    4: 'LB',
    5: 'RB',
    6: 'LT',
    7: 'RT',
  };

 const actionButtonOrder = [2, 3, 5, 4, 0, 1, 7, 6]; // Ajusta los índices exactos de tus 8 botones

  // Función auxiliar para saber el estado de un botón específico de forma segura
  const isPressed = (index: number) => activeButtons[index] || false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col items-center">
      
      {/* Cabecera */}
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
          FGC GAMEPAD TESTER
        </h1>
        <p className="text-slate-400 text-sm mt-1">Laboratorio de Hardware y Limpieza de Ejecución (Fatal Fury / FGC)</p>
      </header>

      {/* Panel Principal */}
      <main className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        
        {gamepads.length === 0 ? (
          <div className="p-6 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-center font-semibold animate-pulse">
            ⚠️ Conecta tu control USB / Leverless y presiona cualquier botón para comenzar...
          </div>
        ) : (
          <div>
            {/* Estado del dispositivo */}
            <div className="mb-6 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-sm">
              <span className="text-slate-400">Dispositivo Activo:</span>
              <span className="font-mono font-bold text-emerald-400">{gamepads[0].id}</span>
            </div>

            {/* Módulo de Visualización Estilo Leverless */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 p-6 rounded-xl border border-slate-800">
              
              {/* Bloque de Movimiento (Simulando Bloque de Direccionales Leverless) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Movimiento (SOCD Check)</h3>
                <div className="grid grid-cols-3 gap-2 max-w-[240px]">
                  {/* Izquierda */}
                  <div className={`p-4 rounded-lg border text-center font-bold transition-all ${isPressed(14) ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                     ←
                  </div>
                  {/* Abajo */}
                  <div className={`p-4 rounded-lg border text-center font-bold transition-all ${isPressed(13) ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    ↓
                  </div>
                  {/* Derecha */}
                  <div className={`p-4 rounded-lg border text-center font-bold transition-all ${isPressed(15) ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                     →
                  </div>
                </div>
                {/* Botón de Salto / Arriba (Pulgar) */}
                <div className="mt-2">
                  <div className={`p-4 rounded-lg border text-center font-bold max-w-[240px] transition-all ${isPressed(12) ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    ↑ 
                  </div>
                </div>
              </div>

              {/* Bloque de Botones de Acción (Golpes / Patadas) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Acciones / Botones</h3>
                <div className="grid grid-cols-4 gap-2">
                  {actionButtonOrder.map((buttonIndex) => (
                    <div
                      key={buttonIndex}
                      className={`h-16 flex items-center justify-center rounded-lg border font-mono font-bold transition-all ${
                        activeButtons[buttonIndex]
                          ? 'bg-gradient-to-tr from-purple-600 to-pink-600 border-pink-400 text-white shadow-lg shadow-purple-500/30 scale-95'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {buttonMap[buttonIndex] ?? `B${buttonIndex}`}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}