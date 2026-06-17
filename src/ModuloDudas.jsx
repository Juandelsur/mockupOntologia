import { Lock, Send, Trash2, Check, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

const DUDAS_INICIALES = [
  {
    id: 1,
    texto: "¿La hinchazón en el brazo es normal o debería avisar antes del control?",
    respondida: false,
  },
  {
    id: 2,
    texto: "¿Puedo seguir tomando el Tamoxifeno si tengo náuseas en la mañana?",
    respondida: true,
  },
  {
    id: 3,
    texto: "¿Qué significa exactamente 'remisión completa' en mi último examen?",
    respondida: false,
  },
];

export default function ModuloDudas({ dudas = DUDAS_INICIALES, setDudas = () => {} }) {
  const [nuevaDuda, setNuevaDuda] = useState("");

  const agregarDuda = () => {
    const texto = nuevaDuda.trim();
    if (!texto) return;
    setDudas((prev) => [{ id: Date.now(), texto, respondida: false }, ...prev]);
    setNuevaDuda("");
  };

  const alternarRespondida = (id) => {
    setDudas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, respondida: !d.respondida } : d))
    );
  };

  const eliminarDuda = (id) => {
    setDudas((prev) => prev.filter((d) => d.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarDuda();
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-b from-orange-50 to-rose-50">
      <div className="w-full max-w-sm min-h-screen px-5 pt-8 pb-10 flex flex-col gap-6">

        {/* Encabezado */}
        <header className="px-1">
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 rounded-full p-2">
              <MessageCircleQuestion className="w-5 h-5 text-amber-700" strokeWidth={2.2} />
            </div>
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
              Mis dudas
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mt-3 leading-snug">
            Anota lo que quieras preguntar
          </h1>
          <p className="text-stone-500 text-base mt-2 leading-relaxed">
            A veces las preguntas se nos olvidan en el box. Acá quedan guardadas para tu próximo control.
          </p>
        </header>

        {/* Mensaje de privacidad */}
        <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <Lock className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-sm text-rose-700 leading-relaxed">
            Solo tú y tu equipo médico pueden ver esto. Escribe con toda confianza.
          </p>
        </div>

        {/* Campo para nueva duda */}
        <section className="bg-white rounded-3xl shadow-sm border border-orange-100 p-4 flex flex-col gap-3">
          <label htmlFor="nueva-duda" className="text-sm font-semibold text-stone-700 px-1">
            Nueva pregunta
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="nueva-duda"
              value={nuevaDuda}
              onChange={(e) => setNuevaDuda(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej: ¿Es normal sentir más cansancio esta semana?"
              rows={2}
              className="flex-1 resize-none rounded-2xl border border-orange-100 bg-orange-50/40 px-4 py-3 text-base text-stone-800 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all"
            />
            <button
              onClick={agregarDuda}
              disabled={!nuevaDuda.trim()}
              aria-label="Guardar pregunta"
              className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 disabled:bg-stone-200 disabled:cursor-not-allowed active:scale-90 transition-all flex items-center justify-center shadow-sm"
            >
              <Send className="w-5 h-5 text-white" strokeWidth={2.2} />
            </button>
          </div>
        </section>

        {/* Lista de dudas */}
        <section className="flex flex-col gap-3">
          {dudas.length === 0 ? (
            <div className="bg-white/60 rounded-3xl border border-orange-100 p-6 text-center">
              <p className="text-stone-500 text-base leading-relaxed">
                Aún no tienes preguntas guardadas. Cuando se te ocurra algo, anótalo arriba.
              </p>
            </div>
          ) : (
            dudas.map((duda) => (
              <div
                key={duda.id}
                className={`rounded-3xl shadow-sm border p-4 flex items-start gap-3 transition-colors ${
                  duda.respondida
                    ? "bg-emerald-50 border-emerald-100"
                    : "bg-white border-orange-100"
                }`}
              >
                <button
                  onClick={() => alternarRespondida(duda.id)}
                  aria-label={
                    duda.respondida
                      ? "Marcar como no respondida"
                      : "Marcar como respondida"
                  }
                  aria-pressed={duda.respondida}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 mt-0.5 ${
                    duda.respondida
                      ? "bg-emerald-500 text-white"
                      : "bg-white border-2 border-amber-300 text-transparent"
                  }`}
                >
                  <Check className="w-5 h-5" strokeWidth={3} />
                </button>

                <p
                  className={`flex-1 text-base leading-relaxed pt-1 ${
                    duda.respondida
                      ? "text-emerald-700 line-through"
                      : "text-stone-700"
                  }`}
                >
                  {duda.texto}
                </p>

                <button
                  onClick={() => eliminarDuda(duda.id)}
                  aria-label="Eliminar pregunta"
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:bg-rose-50 hover:text-rose-500 active:scale-90 transition-all"
                >
                  <Trash2 className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            ))
          )}
        </section>

        {/* Espacio inferior de respiro */}
        <div className="flex-1 flex items-end justify-center pt-4 pb-2">
          <p className="text-sm text-stone-400 text-center leading-relaxed px-4">
            No hay preguntas pequeñas, todas son importantes 💛
          </p>
        </div>
      </div>
    </div>
  );
}
