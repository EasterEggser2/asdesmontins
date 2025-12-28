export default function Footer() {
  // 1. Definimos las redes en un array para limpiar el JSX
  const socialLinks = [
    { href: "https://www.twitch.tv/betomin", src: "/img/Twitch.svg" },
    { href: "https://www.instagram.com/betomin._/", src: "/img/Instagram.svg" },
    { href: "https://www.tiktok.com/@betominok", src: "/img/TikTok.svg" },
    { href: "https://www.youtube.com/@betomin23", src: "/img/YouTube.svg" },
  ];

  const labelCls = "text-Blanco gotham tracking-tight text-sm md:text-[1.1vw] uppercase";
  const textCls = "raleway font-light text-Blanco whitespace-nowrap text-xs md:text-[1vw]";

  return (
    <footer className="w-full bg-Azul text-Blanco border-t border-Blanco/20 shadow-[0_-8px_20px_rgba(0,0,0,0.3)] shrink-0 mt-auto">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 w-[90vw] py-8 md:py-[1vw]">

        {/* ORGANIZADOR */}
        <div className="flex flex-col items-center gap-2 md:gap-[0.5vw] text-center">
          <img src="/img/Logo.svg" alt="Logo" className="h-auto w-32 md:w-[8vw]" loading="lazy" />
          <div className="flex flex-col">
            <p className="raleway uppercase text-Blanco text-[10px] md:text-[0.55vw] tracking-[0.2em]">
              ORGANIZADO POR <span className="font-bold">BETOMIN</span>
            </p>
            <p className="raleway uppercase text-Dorado/80 text-[11px] md:text-[0.58vw] tracking-[0.15em] font-medium">
              Y SUS MODS
            </p>
          </div>
        </div>

        {/* INFORMACIÓN CENTRAL */}
        <div className="flex flex-col items-center gap-6 md:gap-[1.5vw] md:translate-y-[0.5vw]">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[8vw]">
            <div className="flex flex-col items-center md:items-start">
              <span className={labelCls}>Contacto</span>
              <span className={textCls}>Benjamín Barrozo - Betomin</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className={labelCls}>Email</span>
              <span className={textCls}>betomindelpueblo@gmail.com</span>
            </div>
          </div>
          <p className="raleway uppercase text-Blanco/40 text-[9px] md:text-[0.65vw] tracking-widest">
            Created by <span className="hover:text-Dorado transition-colors cursor-default">Axel</span>
          </p>
        </div>

        {/* REDES SOCIALES */}
        <div className="flex items-center gap-4 md:gap-[1.2vw]">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener"
              className="hover:scale-110 hover:brightness-125 transition-all duration-200">
              <img src={link.src} className="h-auto w-8 md:w-[1.8vw]" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}