import PrizeCard from "./PrizeCard.tsx";

const HEAVY_STYLE = {
  textShadow: "0.01vw 0px 0px currentColor, -0.01vw 0px 0px currentColor"
};

export default function PrizesSection() {
  const fsTitle = "4.86vw";
  const fsSponsor = "0.9vw";
  const gapCards = "8.33vw";

  const formatLabel = (num: string, suffix: string) => (
    <span className="flex flex-col items-center -mt-[0.8vw]">
      <span
        className="font-black raleway text-[1.0em] tracking-wider leading-none"
        style={HEAVY_STYLE}
      >
        {num}{suffix}
      </span>
      <span
        className="font-black raleway text-[1.0em] tracking-wider leading-none mt-[0.1vw]"
        style={HEAVY_STYLE}
      >
        LUGAR
      </span>
    </span>
  );

  return (
    <section className="w-full bg-Azul py-[12vh] flex flex-col items-center overflow-hidden">
      <div className="text-center mb-[10vh]">
        <h2 style={{ fontSize: fsTitle }} className="gothamU text-Blanco leading-none uppercase tracking-normal">
          Premios
        </h2>
        <p style={{ fontSize: fsSponsor, letterSpacing: "0.35em" }} className="gotham text-Blanco/40 font-bold uppercase mt-2">
          Sponsoreados por
        </p>
      </div>

      <div style={{ gap: gapCards }} className="flex flex-row flex-wrap lg:flex-nowrap justify-center items-center w-[95vw]">
        <PrizeCard
          label={formatLabel("1", "ER")}
          sponsor="CARPINCHO"
          image="/img/Carpincho.webp"
          prizeTitle="SKIN"
          prizeDesc="LEGENDARIA"
          position="1"
        />

        <PrizeCard
          label={formatLabel("2", "DO")}
          sponsor="MIDDAS"
          image="/img/Middas.webp"
          prizeTitle="SKIN"
          prizeDesc="1350 RP"
          position="2"
        />

        <PrizeCard
          label={formatLabel("3", "ER")}
          sponsor="BETOMIN"
          image="/img/Betomin.webp"
          prizeTitle="PREMIO"
          prizeDesc="SORPRESA"
          position="3"
        />

        <PrizeCard
          label={
            <span className="flex flex-col items-center -mt-[0.6vw]">
              <span
                className="font-black raleway text-[1.0em] tracking-wider leading-none"
                style={HEAVY_STYLE}>
                PREMIO
              </span>
              <span
                className="font-black raleway text-[1.0em] tracking-wider leading-none mt-[0.2vw]"
                style={HEAVY_STYLE}>
                ESPECIAL
              </span>
            </span>
          }
          sponsor="REICH"
          image="/img/Reich.webp"
          prizeTitle="PASE DE"
          prizeDesc="BATALLA"
          position="?"
          isSpecial
          footerText="PRIMERO EN SUBIR LA CUENTA A DIAMANTE"
        />
      </div>
    </section>
  );
}