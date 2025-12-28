import { TORNEO_CONFIG } from "../utils/config.ts";

const PORTAL_CONTENT: Record<string, { title: string; subtitle: string }> = {
  clasificacion: { title: "CLASIFICACIÓN", subtitle: "Tabla de posiciones y estadísticas" },
  showmatch: { title: "SHOWMATCH", subtitle: "Partidas de Exhibición de la comunidad" },
  streams: { title: "STREAMS", subtitle: "Transmisiones en vivo" },
};

export default function Portal({ type }: { type: "clasificacion" | "showmatch" | "streams" }) {
  const { title, subtitle } = PORTAL_CONTENT[type] || PORTAL_CONTENT.showmatch;

  // Formateamos la fecha desde el objeto TORNEO_CONFIG para eliminar el error de lint
  const fecha = new Date(TORNEO_CONFIG.fechaInicio);
  const diaMes = fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long" }).toUpperCase();
  const hora = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const Corner = ({ pos }: { pos: string }) => (
    <div className={`absolute ${pos} p-[1.2vw] opacity-20 group-hover:opacity-50 transition-opacity`}>
      <div className={`w-[1vw] h-[1vw] border-Dorado ${pos.includes('top') ? 'border-t-[0.15vw]' : 'border-b-[0.15vw]'} ${pos.includes('right') ? 'border-r-[0.15vw]' : 'border-l-[0.15vw]'} ${pos.includes('right') ? 'rounded-tr-[0.2vw]' : 'rounded-bl-[0.2vw]'}`} />
    </div>
  );

  return (
    <div className="bg-Azul/80 backdrop-blur-md border-[0.15vw] border-Dorado/30 rounded-[1.4vw] p-[2.8vw] shadow-[0_2vw_5vw_-1vw_rgba(0,0,0,0.8)] text-center max-w-[45vw] w-full animate-fade-in relative overflow-hidden group">
      <div className="absolute -top-[10vw] -left-[10vw] w-[25vw] h-[25vw] bg-Dorado/5 rounded-full blur-[6vw] pointer-events-none group-hover:bg-Dorado/10 transition-colors duration-700" />

      <h1 className="text-[2.8vw] font-black gothamU text-Dorado uppercase tracking-tighter mb-[0.5vw] leading-none italic">{title}</h1>
      <div className="h-[0.2vw] w-[5vw] bg-Dorado mx-auto mb-[1.5vw] opacity-60 group-hover:w-[10vw] transition-all duration-500" />
      <p className="raleway text-[1.1vw] text-Blanco/70 font-medium italic mb-[2.5vw] px-[2vw]">"{subtitle}"</p>

      <div className="py-[1.8vw] px-[2vw] border-[0.1vw] border-Blanco/10 rounded-[1.2vw] bg-black/40 relative overflow-hidden group-hover:border-Dorado/20 transition-colors">
        <p className="gothamM text-[0.7vw] text-Blanco/30 uppercase tracking-[0.5em] font-bold mb-[1vw]">FECHA DE INICIO</p>
        <div className="flex items-center justify-center gap-[0.8vw]">
          <p className="gotham text-[1.5vw] text-Blanco font-black uppercase italic tracking-tighter">
            {diaMes} <span className="text-Dorado">/</span> {hora}
          </p>
          <div className="w-[2vw] drop-shadow-[0_0_0.3vw_rgba(116,172,223,0.4)] translate-y-[-0.1vw]">
            <svg viewBox="0 0 768 480" className="w-full h-auto rounded-[0.1vw]">
              <path fill="#74acdf" d="M0 0h768v160H0z"/><path fill="#fff" d="M0 160h768v160H0z"/><path fill="#74acdf" d="M0 320h768v160H0z"/><circle fill="#f6b433" cx="384" cy="240" r="34"/><g fill="#f6b433"><path d="M384 193l6 31h-12zM384 287l6-31h-12zM431 240l-31 6v-12zM337 240l31 6v-12z"/></g>
            </svg>
          </div>
        </div>
      </div>

      <Corner pos="top-0 right-0" />
      <Corner pos="bottom-0 left-0" />
    </div>
  );
}