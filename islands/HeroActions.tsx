import { useState } from "preact/hooks";
import RulesModal from "@/components/modal/RulesModal.tsx";
import VideoModal from "@/components/modal/VideoModal.tsx";
import InscripcionForm from "./InscripcionForm.tsx";

export default function HeroActions() {
  const [showRules, setShowRules] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const btnBase = "gothamU uppercase tracking-widest md:tracking-[0.15em] transition-all duration-200 outline-none active:scale-95";

  return (
    <div className="w-full flex justify-center px-2 md:px-0">
      <div className="bg-Blanco/80 backdrop-blur-sm rounded-xl md:rounded-[2.2vw] p-2.5 md:p-[3vw] w-full max-w-md md:max-w-none md:w-[75%] border md:border-[0.35vw] border-Dorado/60 flex flex-col gap-2 md:gap-[2.2vh] shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-Dorado hover:shadow-Dorado/10">

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className={`${btnBase} w-full py-2 md:py-[2.8vh] rounded-lg md:rounded-[1.4vw] bg-Dorado text-Azul text-xs md:text-[1.4vw] font-black hover:brightness-110 shadow-md`}
        >
          INSCRIPCIÓN
        </button>

        <div className="flex gap-2 md:gap-[1.4vw]">
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className={`${btnBase} flex-1 py-1.5 md:py-[2vh] rounded-md md:rounded-[1vw] bg-Azul text-Blanco text-[9px] md:text-[0.95vw] hover:bg-Azul/90`}
          >
            REGLAS
          </button>

          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className={`${btnBase} flex-1 py-1.5 md:py-[2vh] rounded-md md:rounded-[1vw] bg-Blanco/30 border md:border-[0.2vw] border-Azul text-Azul text-[9px] md:text-[0.95vw] hover:bg-Blanco/70 hover:text-Azul/80`}
          >
            TRAILER
          </button>
        </div>
      </div>

      {showRules && <RulesModal open={showRules} onClose={() => setShowRules(false)} />}
      {showVideo && <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />}
      {showForm && <InscripcionForm isOpen={showForm} onClose={() => setShowForm(false)} />}
    </div>
  );
}