import { Send, Sparkles, ShieldAlert } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MENSAJES_INICIALES = [
  {
    id: 1,
    autor: "bot",
    texto:
      "Hola María 🌿 Soy tu asistente de acompañamiento. Estoy aquí para responder tus dudas a cualquier hora. ¿En qué te puedo ayudar hoy?",
  },
  {
    id: 2,
    autor: "usuario",
    texto: "Hola, tengo algo de náuseas desde ayer. ¿Es normal con el Tamoxifeno?",
  },
  {
    id: 3,
    autor: "bot",
    texto:
      "Las náuseas leves pueden presentarse con el Tamoxifeno, especialmente las primeras semanas. Te recomiendo tomarlo junto con alimento. Si las náuseas son intensas o no mejoran en un par de días, cuéntaselo a tu equipo médico en tu próximo control o antes si lo necesitas.",
  },
];

export default function ChatbotAcompanamiento({
  mensajes = MENSAJES_INICIALES,
  setMensajes = () => {},
}) {
  const [entrada, setEntrada] = useState("");
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = () => {
    const texto = entrada.trim();
    if (!texto) return;

    setMensajes((prev) => [
      ...prev,
      { id: Date.now(), autor: "usuario", texto },
    ]);
    setEntrada("");

    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          autor: "bot",
          texto:
            "Gracias por contarme. Voy a dejar esto registrado para que tu equipo médico lo revise también en tu próximo control.",
        },
      ]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensaje();
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-b from-orange-50 to-rose-50">
      <div className="w-full max-w-sm min-h-screen flex flex-col">

        {/* Encabezado */}
        <header className="px-5 pt-8 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 rounded-full p-2.5">
              <Sparkles className="w-5 h-5 text-amber-700" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                Asistente
              </p>
              <h1 className="text-xl font-bold text-stone-800 leading-snug">
                Acompañamiento 24/7
              </h1>
            </div>
          </div>

          {/* Aviso de asistente automatizado */}
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 mt-4">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-xs text-amber-700 leading-relaxed">
              Soy un asistente automatizado y no remplazo a tu equipo médico. Ante una urgencia, contacta directamente al hospital.
            </p>
          </div>
        </header>

        {/* Hilo de mensajes */}
        <main className="flex-1 overflow-y-auto px-5 py-2 flex flex-col gap-3">
          {mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={`flex ${
                mensaje.autor === "usuario" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-base leading-relaxed shadow-sm ${
                  mensaje.autor === "usuario"
                    ? "bg-rose-500 text-white rounded-br-lg"
                    : "bg-white text-stone-800 border border-orange-100 rounded-bl-lg"
                }`}
              >
                {mensaje.texto}
              </div>
            </div>
          ))}
          <div ref={finRef} />
        </main>

        {/* Input fijo */}
        <footer className="flex-shrink-0 px-5 py-4 bg-gradient-to-t from-rose-50 via-rose-50 to-transparent">
          <div className="flex items-end gap-2 bg-white rounded-3xl shadow-sm border border-orange-100 p-2">
            <textarea
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              rows={1}
              className="flex-1 resize-none bg-transparent px-3 py-2.5 text-base text-stone-800 placeholder:text-stone-400 outline-none max-h-24"
            />
            <button
              onClick={enviarMensaje}
              disabled={!entrada.trim()}
              aria-label="Enviar mensaje"
              className="flex-shrink-0 w-11 h-11 rounded-full bg-rose-500 hover:bg-rose-600 disabled:bg-stone-200 disabled:cursor-not-allowed active:scale-90 transition-all flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" strokeWidth={2.2} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
