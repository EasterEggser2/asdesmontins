import { ComponentChildren } from "preact";

interface PrizeProps {
  label: string | ComponentChildren;
  sponsor: string;
  image: string;
  prizeTitle: string;
  prizeDesc: string;
  position: string;
  footerText?: string;
  isSpecial?: boolean;
}

export default function PrizeCard({
  label,
  sponsor,
  image,
  prizeTitle,
  prizeDesc,
  position,
  footerText,
  isSpecial
}: PrizeProps) {

  // Estos colores son exclusivos del podio (1er, 2do, 3er)
  const getPositionColor = (pos: string) => {
    switch (pos) {
      case "1": return "bg-[#FFD700] shadow-[0_0_1.3vw_rgba(255,215,0,0.4)]";
      case "2": return "bg-[#C0C0C0] shadow-[0_0_1.3vw_rgba(192,192,192,0.4)]";
      case "3": return "bg-[#CD7F32] shadow-[0_0_1.3vw_rgba(205,127,50,0.4)]";
      default: return "bg-Dorado";
    }
  };

  return (
    <div className="flex flex-col bg-Blanco overflow-hidden shadow-2xl w-[12.5vw] shrink-0 rounded-[2.4vw] aspect-[1/2.1]">

      {/* 1. ETIQUETA LUGAR */}
      <div className="pt-[15%] pb-[8%] mb-[10%] flex flex-col items-center">
        <div className="text-[1.1vw] gotham text-Azul text-center uppercase leading-none">
          {label}
        </div>
      </div>

      {/* 2. IMAGEN CIRCULAR */}
      <div className="flex justify-center">
        <div className="w-[7.9vw] h-[7.9vw] rounded-full overflow-hidden ring-[0.35vw] ring-inset ring-Azul">
          <img src={image} className="w-full h-full object-cover" alt={sponsor} />
        </div>
      </div>

      {/* 3. SPONSOR */}
      <div className="flex flex-col items-center pt-[10%] italic">
        <span className="text-[0.8vw] gotham text-Azul font-bold uppercase">
          {sponsor}
        </span>
      </div>

      {/* 4. FRANJA  */}
      <div className="mt-[13%] bg-Azul py-[5%] flex flex-col items-center text-Blanco gap-[0.1vw]">
        <span className="text-[0.9vw] ralewayL font-black uppercase leading-none">
          {prizeTitle}
        </span>
        <span className="text-[0.9vw] ralewayL font-black uppercase leading-none">
          {prizeDesc}
        </span>
      </div>

      {/* 5. FOOTER */}
      <div className={`grow flex flex-col items-center justify-center ${isSpecial ? "" : "p-[5%]"}`}>
        {isSpecial ? (
          <div className={`${getPositionColor("?")} w-full h-full flex items-center justify-center text-Azul text-center leading-tight uppercase raleway font-bold text-[0.8vw] p-[0.8vw]`}>
            {footerText}
          </div>
        ) : (
          <div className={`${getPositionColor(position)} text-Blanco flex items-center justify-center gothamU rounded-full shadow-xl border-[0.25vw] border-Blanco/30 w-[3.1vw] h-[3.1vw] text-[1.7vw]`}>
            {position}
          </div>
        )}
      </div>
    </div>
  );
}