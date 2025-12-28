// routes/clasificacion.tsx
import { define } from "../utils.ts";
import { useTorneoStatus } from "../utils/config.ts";
import Portal from "@/components/portal.tsx";

export default define.page(function Clasificacion() {
  const { isLive, isFinished } = useTorneoStatus();
  const isBefore = !isLive && !isFinished;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-[8vw] pb-[4vw] px-[2vw] bg-Azul relative overflow-hidden">
      {isBefore && (
        <Portal type="clasificacion" />
      )}
      {(isLive || isFinished) && (
        <div className="w-full max-w-[85vw] animate-fade-in flex flex-col items-center">
          <header className="text-center mb-[2vw]">
            <h1 className="text-[3vw] font-black gothamU text-Dorado uppercase italic leading-none">
              {isFinished ? "Resultados Finales" : "Leaderboard Oficial"}
            </h1>
            <div className="h-[0.2vw] w-[10vw] bg-Dorado/40 mx-auto mt-[1vw] shadow-[0_0_1.5vw_rgba(223,183,96,0.4)]" />
          </header>

          <div className="w-full h-[40vw] bg-black/20 backdrop-blur-sm border-[0.15vw] border-Dorado/20 rounded-[1.4vw] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-Dorado/5 to-transparent w-full h-[20%] animate-scan" />

            <p className="raleway text-white/40 italic text-[1.5vw] tracking-widest uppercase animate-pulse">
              {isFinished ? "Archivo de Competencia" : "Sincronizando base de datos..."}
            </p>
          </div>
        </div>
      )}

    </section>
  );
});