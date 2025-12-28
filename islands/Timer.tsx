import { useEffect, useState, useRef } from "preact/hooks";
import { TORNEO_CONFIG } from "@/utils/config.ts";

// --- Interfaces ---
interface TimeState {
  dias: string; horas: string; minutos: string; segundos: string;
  etapa: "espera" | "en_curso" | "finalizado";
  labelDia: string;
}

interface TimeUnitProps {
  value: string; prevValue: string; label: string; showSeparator?: boolean;
}

// --- Lógica de cálculo ---
const calculateState = (): TimeState => {
  const ahora = Date.now();
  const { fechaInicio, fechaFin, textos } = TORNEO_CONFIG;
  let diff = 0;
  let etapa: "espera" | "en_curso" | "finalizado" = "espera";
  let labelDia = "";

  if (ahora < fechaInicio) {
    diff = fechaInicio - ahora;
    labelDia = textos.antes;
  } else if (ahora < fechaFin) {
    diff = fechaFin - ahora;
    etapa = "en_curso";
    const msHastaFin = fechaFin - ahora;
    if (msHastaFin <= 86400000) {
      labelDia = textos.ultimoDia;
    } else {
      const nDia = Math.floor((ahora - fechaInicio) / 86400000) + 1;
      labelDia = `Día ${nDia} del torneo`;
    }
  } else {
    etapa = "finalizado";
    labelDia = textos.terminado;
  }

  const getS = (ms: number) => Math.floor(ms).toString().padStart(2, "0");
  return {
    dias: getS(diff / 86400000),
    horas: getS((diff / 3600000) % 24),
    minutos: getS((diff / 60000) % 60),
    segundos: getS((diff / 1000) % 60),
    etapa,
    labelDia
  };
};

// --- Sub-componentes ---
const Digit = ({ current, previous }: { current: string; previous: string }) => {
  const isChanging = current !== previous;
  return (
    <div className="fcc-digit">
      <div className="fcc-section fcc-bottom"><span className="fcc-number">{current}</span></div>
      <div className="fcc-section fcc-top"><span className="fcc-number">{current}</span></div>
      {isChanging && (
        <>
          <div className="fcc-section fcc-bottom fcc-old"><span className="fcc-number">{previous}</span></div>
          <div key={current} className="fcc-leaf-container">
            <div className="fcc-leaf-front"><span className="fcc-number">{previous}</span></div>
            <div className="fcc-leaf-back"><span className="fcc-number">{current}</span></div>
          </div>
        </>
      )}
      <div className="fcc-divider-line" />
    </div>
  );
};

const TimeUnit = ({ value, prevValue, label, showSeparator }: TimeUnitProps) => (
  <div className="flex items-center group/unit">
    <div className="flex flex-col items-center">
      <div className="flex gap-[0.4vw]">
        <Digit current={value[0]} previous={prevValue[0]} />
        <Digit current={value[1]} previous={prevValue[1]} />
      </div>
      <span className="gotham text-[10px] md:text-[0.8vw] font-bold mt-[1vh] text-Azul tracking-widest">{label}</span>
    </div>
    {showSeparator && (
      <div className="text-Azul/20 font-light text-[2vw] mx-[0.5vw] translate-y-[-1vw]">:</div>
    )}
  </div>
);

// --- Componente Principal ---
export default function Timer() {
  const initialState = calculateState();
  const [time, setTime] = useState<TimeState>(initialState);
  const prevTime = useRef<TimeState>(initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = calculateState();
      if (next.segundos !== time.segundos || next.labelDia !== time.labelDia) {
        prevTime.current = time;
        setTime(next);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // Estilo del contenedor principal
  const wrapperClass = "bg-Blanco/80 backdrop-blur-sm rounded-xl md:rounded-[2vw] p-3 md:p-[1.2vw] w-fit mx-auto border md:border-[0.3vw] border-Dorado/60 shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 group";
  if (time.etapa === "finalizado") {
    return (
      <div className={wrapperClass}>
        <h3 className="gothamU text-Azul text-[1.4vw] font-black uppercase text-center italic">
          {time.labelDia}
        </h3>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {/* Etiqueta de estado del torneo */}
      <h3 className="gotham text-Azul text-[10px] md:text-[0.9vw] tracking-[0.3em] uppercase mb-[2.5vh] font-bold text-center group-hover:text-Azul/60 transition-colors">
        {time.labelDia}
      </h3>

      {/* Grid de tiempo */}
      <div className="flex items-center justify-center gap-[0.5vw]">
        <TimeUnit value={time.dias} prevValue={prevTime.current.dias} label="DÍAS" showSeparator />
        <TimeUnit value={time.horas} prevValue={prevTime.current.horas} label="HORAS" showSeparator />
        <TimeUnit value={time.minutos} prevValue={prevTime.current.minutos} label="MINUTOS" showSeparator />
        <TimeUnit value={time.segundos} prevValue={prevTime.current.segundos} label="SEGUNDOS" />
      </div>
    </div>
  );
}