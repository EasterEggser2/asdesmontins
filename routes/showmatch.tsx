// routes/showmatch.tsx
import { define } from "../utils.ts";
import { useTorneoStatus } from "../utils/config.ts";
import Portal from "@/components/portal.tsx";

export default define.page(function Showmatch() {
  const { isLive, isFinished } = useTorneoStatus();
  const isBefore = !isLive && !isFinished;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-[8vw] pb-[4vw] px-[2vw] bg-Azul relative overflow-hidden">
      {isBefore && (
        <Portal type="showmatch" />
      )}
      {(isLive || isFinished) && (
        <div className="w-full max-w-[80vw] animate-fade-in">
          <header className="text-center mb-[3vw]">
            <h1 className="text-[3vw] font-black gothamU text-Dorado uppercase italic leading-none">
              {isFinished ? "Revive los Showmatches" : "Cartelera de Exhibición"}
            </h1>
            <p className="raleway text-Blanco/60 text-[1.1vw] mt-[1vw]">
              {isFinished ? "Los duelos más memorables del torneo" : "Los mejores duelos de la comunidad"}
            </p>
          </header>

          <div className="grid grid-cols-2 gap-[2vw]">
            <div className="aspect-video bg-Blanco/5 border border-Blanco/10 rounded-[1vw] shadow-xl hover:border-Dorado/30 transition-all duration-500 flex items-center justify-center italic text-Blanco/20">
              Próximamente
            </div>
            <div className="aspect-video bg-Blanco/5 border border-Blanco/10 rounded-[1vw] shadow-xl hover:border-Dorado/30 transition-all duration-500 flex items-center justify-center italic text-Blanco/20">
              Próximamente
            </div>
          </div>
        </div>
      )}

    </section>
  );
});