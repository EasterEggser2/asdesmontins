
import { useEffect, useState } from "preact/hooks";

interface NavbarProps {
  url?: URL;
}

export default function Navbar({ url }: NavbarProps) {
  const [currentPath, setCurrentPath] = useState(
    url?.pathname ||
      (typeof window !== "undefined" ? globalThis.location.pathname : "/"),
  );

  useEffect(() => {
    const syncPath = () => {
      requestAnimationFrame(() => {
        if (globalThis.location.pathname !== currentPath) {
          setCurrentPath(globalThis.location.pathname);
        }
      });
    };
    globalThis.addEventListener("f-navigation", syncPath);
    globalThis.addEventListener("popstate", syncPath);
    globalThis.addEventListener("mouseover", syncPath);

    return () => {
      globalThis.removeEventListener("f-navigation", syncPath);
      globalThis.removeEventListener("popstate", syncPath);
      globalThis.removeEventListener("mouseover", syncPath);
    };
  }, [currentPath]);

  const getLinkClass = (path: string) => {
    const active = currentPath === path ||
      (currentPath.replace(/\/$/, "") === path.replace(/\/$/, ""));

    return `
      raleway relative inline-block uppercase tracking-[0.2em] transition-all duration-300
      text-[1.2vw]
      ${active ? "text-Dorado font-bold scale-105" : "text-Blanco font-light hover:text-Dorado"}
      after:content-[''] after:absolute after:bottom-[-0.5vw] after:left-0 after:h-[0.1vw] after:w-full after:bg-Dorado
      after:transition-transform after:duration-300
      ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
    `.replace(/\s+/g, " ").trim();
  };

  return (
    <header className="fixed top-0 w-full z-3 grid grid-cols-[1fr_auto_1fr] items-center px-[5vw] bg-transparent h-[6vw]">
      {/* Navegación Izquierda */}
      <nav className="flex justify-end pr-[2vw] gap-[3vw]">
        <a href="/" className={getLinkClass("/")}>
          INICIO
        </a>
        <a href="/clasificacion" className={getLinkClass("/clasificacion")}>
          CLASIFICACIÓN
        </a>
      </nav>

      {/* Espacio Central */}
      <div className="flex justify-center w-[10vw]">
      </div>

      {/* Navegación Derecha */}
      <nav className="flex justify-start pl-[2vw] gap-[3vw]">
        <a href="/streams" className={getLinkClass("/streams")}>
          STREAMS
        </a>
        <a href="/showmatch" className={getLinkClass("/showmatch")}>
          SHOWMATCH
        </a>
      </nav>
    </header>
  );
}