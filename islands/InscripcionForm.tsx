import { useState } from "preact/hooks";
import Modal from "../components/modal/Modal.tsx";

const FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfpi2FGlmsDNoq-9s2vXQgPM-94sTsG_qRPvkCuEiySGbCMwQ/formResponse";

// --- TIPOS E INTERFACES ---
type FormState = { riotId: string; region: string; twitch: string; streameas: string; discord: string; };

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onInput: (e: Event) => void;
  warn?: string;
  className: string;
}

interface RadioGroupProps {
  label: string;
  options: string[];
  name: string;
  current: string;
  onInput: (e: Event) => void;
  radioCls: (act: boolean) => string;
}

// --- LÓGICA DE VALIDACIÓN ---
const validate = (name: string, value: string) => {
  if (!value) return "Requerido";
  if (name === "riotId" && !value.includes("#BTOQ2")) return "Falta #BTOQ2";
  if (name === "twitch") {
  if (value.includes("twitch.tv/")) {
    return "Ingresa solo Canal";
  }
  const regexTwitch = /^[a-zA-Z0-9_]+$/;
  if (!regexTwitch.test(value)) {
    return "Ingresa solo Canal";
  }
}
  return undefined;
};

// --- SUB-COMPONENTES (UI) ---
const InputField = ({ name, placeholder, value, onInput, warn, className }: InputFieldProps) => (
  <div className="w-full md:flex-1 relative">
    <input name={name} placeholder={placeholder} value={value} onInput={onInput} className={className} autoComplete="off" />
    {warn && (
      <span className="absolute gotham right-[2vw] top-1/2 -translate-y-1/2 text-red-400 font-bold uppercase text-[2.9vw] md:text-[0.9vw]">
        {warn}
      </span>
    )}
  </div>
);

const RadioGroup = ({ label, options, name, current, onInput, radioCls }: RadioGroupProps) => (
  <div className="w-full md:w-[12vw] flex flex-col gap-[0.5vh]">
    <label className="gotham text-Dorado text-[3vw] md:text-[0.7vw] font-black text-center uppercase">{label}</label>
    <div className="flex bg-Azul/50 rounded-[1vw] p-[0.3vw] border-2 border-Blanco/10 h-[7vh] md:h-[7.5vh] items-stretch gap-[0.3vw]">
      {options.map((opt) => (
        <label key={opt} className={radioCls(current === opt)}>
          <input type="radio" name={name} value={opt} checked={current === opt} onInput={onInput} className="hidden" />
          <span className="flex items-center justify-center h-full">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function InscripcionForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ riotId: "", region: "", streameas: "", discord: "", twitch: "" });
  const [warns, setWarns] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">("idle");

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setForm(prev => ({ ...prev, [name]: value }));
    setWarns(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const newWarns: Record<string, string | undefined> = {};
    (Object.keys(form) as Array<keyof FormState>).forEach(key => {
      const error = validate(key, form[key]);
      if (error) newWarns[key] = error;
    });

    if (Object.keys(newWarns).length > 0) return (setWarns(newWarns), setStatus("error"));

    setStatus("loading");
    const payload = new URLSearchParams({
      "entry.1221956897": form.riotId, "entry.1865107259": form.region,
      "entry.996253528": form.discord, "entry.494061001": form.streameas,
      "entry.1448078224": form.twitch,
    });

    try {
      await fetch(FORM_URL, { method: "POST", body: payload, mode: "no-cors" });
      setStatus("success");
    } catch { setStatus("error"); }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const btnBase = "gotham rounded-[1vw] py-[1.5vh] font-black text-[3vw] md:text-[0.9vw] uppercase transition-all duration-200";

const getInputCls = (n: string) => `
  gotham w-full bg-Azul/50 border-2 rounded-[1vw] px-[1vw] md:px-[0.8vw] text-Blanco outline-none transition-all
  h-[7vh] md:h-[7.5vh]
  ${warns[n] ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-Blanco/10 focus:border-Dorado"}
`;

  const getRadioCls = (act: boolean) => `
    gotham flex-1 cursor-pointer text-[3vw] md:text-[0.8vw] py-[1vh] rounded-[0.5vw] font-black text-center transition-all
    ${act ? "bg-Dorado text-Azul" : "text-Blanco/40 hover:text-Blanco"}
  `;

  return (
    <Modal maxWidth="max-w-[95vw] md:max-w-[40vw]" isOpen={isOpen} onClose={onClose}>
      <form className="w-full bg-Azul rounded-xl overflow-hidden shadow-2xl relative" onSubmit={handleSubmit}>
        <div className="w-full h-[15vh] md:h-[20vh] bg-cover bg-center border-b border-Dorado/30" style={{ backgroundImage: 'url("/img/FormHeader.webp")' }} />

        <div className="flex flex-col gap-[2vh] p-[5vw] md:p-[2.5vw]">
          <h1 className="gothamU text-[5vw] md:text-[1.5vw] text-center text-Dorado font-black uppercase tracking-[0.2em] -mt-[3vw] md:-mt-[2vw] relative z-10">
            INSCRIPCIÓN
          </h1>

          <div className="flex flex-col md:flex-row gap-[2vh] md:gap-[1.5vw] items-end">
            <InputField name="riotId"
            placeholder="Riot ID"
            value={form.riotId}
            warn={warns.riotId}
            onInput={handleInput} className={getInputCls("riotId")} />

            <RadioGroup name="region"
            label="Región"
            options={["LAS", "LAN", "BR"]}
            current={form.region}
            onInput={handleInput} radioCls={getRadioCls} />
          </div>

          <div className="flex flex-col md:flex-row gap-[2vh] md:gap-[1.5vw] items-end">
            <InputField name="discord"
            placeholder="Discord/ID"
            value={form.discord}
            onInput={handleInput}
            className={getInputCls("discord")}/>

            <RadioGroup name="streameas"
            label="¿Vas a Streamear?"
            options={["SI", "NO"]}
            current={form.streameas}
            onInput={handleInput} radioCls={getRadioCls} />
          </div>

          <div className="flex flex-col md:flex-row gap-[2vh] md:gap-[1.5vw] items-end mt-[2vh] md:mt-[3vh]">
            <InputField name="twitch"
            placeholder="Canal de Twitch"
            value={form.twitch}
            warn={warns.twitch}
            onInput={handleInput} className={getInputCls("twitch")} />
          </div>

          <div className="h-[8vh] md:h-[12vh] w-full bg-cover bg-center opacity-80 rounded-[1vw] border border-Blanco/5" style={{ backgroundImage: 'url("/img/FormFooter.webp")' }} />

          <div className="grid grid-cols-2 gap-[1.5vw] mt-[1vh]">
            <button type="submit"
             disabled={isLoading}
             className={`${btnBase} bg-Dorado text-Azul shadow-lg
             ${isLoading ? "opacity-50" : "hover:brightness-110 active:scale-95"}`}>
              {isLoading ? "ENVIANDO..." : "REGISTRARSE"}
            </button>
            <button type="button"
            onClick={onClose}
            className={`${btnBase} border-2 border-Blanco/20 text-Blanco hover:bg-Blanco/5`}
            >CERRAR</button>
          </div>
        </div>

        {status !== "idle" && !isLoading && (
          <div className="absolute inset-0 z-100 flex items-center justify-center bg-Azul/95 backdrop-blur-md p-[5vw]">
            <div className={`p-[6vw] md:p-[2vw] rounded-[2vw] text-center w-full max-w-[80vw] md:max-w-[25vw] bg-Blanco border-b-[1vh] ${isSuccess ? "border-green-500" : "border-red-500"}`}>
              <p className="gothamU text-Azul font-black mb-[3vh] text-[4vw] md:text-[1.2vw] uppercase">{isSuccess ? "¡Registro Exitoso!" : "Error en campos"}</p>
              <button type="button" onClick={() => (isSuccess && onClose(), setStatus("idle"))} className="gothamU bg-Azul text-Blanco w-full py-[1.5vh] rounded-[1vw] font-black text-[3.5vw] md:text-[0.8vw] uppercase active:scale-95">ENTENDIDO</button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}