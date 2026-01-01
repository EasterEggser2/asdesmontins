// routes/index.tsx
import Timer from "@/islands/Timer.tsx";
import HeroActions from "@/islands/HeroActions.tsx";
import PrizesSection from "../components/prize/PrizeSection.tsx";
import { Head } from "fresh/runtime";

export default function Inicio() {
  return (
    <>
      <Head>
        <link rel="preload" href="/img/Hero.webp" as="image" fetchpriority="high" />
        <link rel="preload" href="/img/FormHeader.webp" as="image" />
        <link rel="preload" href="/img/FormFooter.webp" as="image" />
      </Head>
      <main className="bg-Azul text-Blanco overflow-x-hidden flex flex-col">
        <div className="relative w-full h-screen bg-Azul shrink-0">
          <img
            src="/img/Hero.webp"
            className="absolute inset-0 w-full h-full object-cover object-[50%_10%]"
            alt="Hero"
          />
          <div className="relative flex flex-col items-center justify-center h-full">
          </div>
        </div>
        <section className="relative w-full max-w-[90vw] mx-auto py-[10vh] grid md:grid-cols-2 gap-[6vw] items-center">
          <div className="absolute inset-0 bg-Dorado/5 blur-[12vw] rounded-full pointer-events-none " />

          <div className="flex flex-col items-center md:items-start gap-[3vw] relative ">
            <div className="w-full flex justify-center md:justify-start">
              <Timer />
            </div>
            <div className="w-full">
              <HeroActions />
            </div>
          </div>
          <div className="raleway text-[4vw] md:text-[1.2vw] space-y-[2vw] relative">
            <h2 className="gothamU text-[8vw] md:text-[4.5vw] text-Blanco uppercase italic leading-none mb-[2vw]">
              En qué <br/> consiste...
            </h2>
            <p className="border-l-2 border-Dorado/30 pl-4">
              Torneo de <span className="text-Blanco font-bold">SoloQueue</span> para medir habilidades contra streamers, mods, vips, viewers, etc.
            </p>
            <p className="pl-5">
              Absolutamente todos contra todos en una competencia sin tregua.
            </p>

            <div className="bg-Dorado/10 border border-Dorado/20 p-6 rounded-xl italic">
              <p className="gotham font-black text-Blanco uppercase tracking-tight">
                Dos semanas para decidir al campeón del BTOQ2.
              </p>
            </div>
          </div>
        </section>
        <PrizesSection />

      </main>
    </>
  );
}
