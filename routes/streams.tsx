// routes/streams.tsx
import { define } from "../utils.ts";
import { useTorneoStatus } from "../utils/config.ts";
import Portal from "../components/portal.tsx";

export default define.page(function Streams() {
  const { isLive, isFinished } = useTorneoStatus();
  const isBefore = !isLive && !isFinished;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-[8vw] pb-[4vw] px-[2vw] bg-Azul relative overflow-hidden">
      {isBefore && (
        <Portal type="streams" />
      )}
      {(isLive || isFinished) && (
        <div className="w-full max-w-[75vw] flex flex-col items-center animate-fade-in">
          <div className="w-full aspect-video bg-Negro border-[0.2vw] border-Dorado/50 rounded-[1vw] shadow-[0_0_5vw_rgba(0,0,0,0.5)] overflow-hidden relative group">

            <div className="absolute inset-0 flex items-center justify-center bg-Azul/40 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-700">
              <h2 className="text-Dorado gothamU italic text-[2vw] animate-pulse">
                {isFinished ? "Transmisión Finalizada" : "Conectando con la señal oficial..."}
              </h2>
            </div>

            <div className="w-full h-full flex items-center justify-center text-Dorado/10 gothamU italic text-[3vw]">
              {isFinished ? "VOD REPLAY" : "LIVE STREAM"}
            </div>
          </div>

          <div className="mt-[2vw] w-full flex justify-between items-center bg-black/40 p-[1.5vw] rounded-[1vw] border border-white/10 backdrop-blur-md">
            <h2 className="text-Blanco gothamU text-[1.4vw] uppercase tracking-tighter">
              {isFinished ? "Resumen de la Gran Final" : "Transmisión Oficial BTOQ"}
            </h2>

            <div className="flex items-center gap-[0.8vw]">
              <span className={`w-[0.7vw] h-[0.7vw] rounded-full ${isLive ? 'bg-red-600 animate-ping' : 'bg-white/20'}`} />
              <span className="text-Blanco/90 raleway text-[1vw] font-bold tracking-widest uppercase">
                {isLive ? "En Vivo" : "Desconectado"}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
});