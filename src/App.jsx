import { Home, MessageCircleQuestion, Sparkles, Calendar } from "lucide-react";
import { useState } from "react";
import PantallaInicio from "./PantallaInicio";
import ModuloDudas from "./ModuloDudas";
import ChatbotAcompanamiento from "./ChatbotAcompanamiento";
import AgendaControles from "./AgendaControles";
import DetalleControlPendiente from "./DetalleControlPendiente";

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

const TABS = [
  { id: "inicio", etiqueta: "Inicio", Icono: Home },
  { id: "dudas", etiqueta: "Mis dudas", Icono: MessageCircleQuestion },
  { id: "chatbot", etiqueta: "Asistente", Icono: Sparkles },
  { id: "agenda", etiqueta: "Controles", Icono: Calendar },
];

export default function App() {
  const [vistaActiva, setVistaActiva] = useState("inicio");
  const [vistaAnterior, setVistaAnterior] = useState("inicio");

  // Estado elevado al contenedor para que persista entre navegaciones,
  // simulando una sesión real en lugar de reiniciarse al cambiar de tab.
  const [dudas, setDudas] = useState(DUDAS_INICIALES);
  const [mensajes, setMensajes] = useState(MENSAJES_INICIALES);

  const irADetalle = (origen) => {
    setVistaAnterior(origen);
    setVistaActiva("detalle");
  };

  const volver = () => {
    setVistaActiva(vistaAnterior);
  };

  const renderVista = () => {
    switch (vistaActiva) {
      case "inicio":
        return <PantallaInicio onVerDetalles={() => irADetalle("inicio")} />;
      case "dudas":
        return <ModuloDudas dudas={dudas} setDudas={setDudas} />;
      case "chatbot":
        return <ChatbotAcompanamiento mensajes={mensajes} setMensajes={setMensajes} />;
      case "agenda":
        return <AgendaControles onVerDetalles={() => irADetalle("agenda")} />;
      case "detalle":
        return <DetalleControlPendiente onVolver={volver} />;
      default:
        return <PantallaInicio onVerDetalles={() => irADetalle("inicio")} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-stone-100">
      <div className="w-full max-w-sm min-h-screen bg-white flex flex-col relative shadow-xl">

        {/* Contenido de la vista activa */}
        <div className={`flex-1 overflow-y-auto ${vistaActiva === "detalle" ? "pb-0" : "pb-20"}`}>
          {renderVista()}
        </div>

        {/* Barra de navegación inferior — oculta en vista de detalle */}
        <nav
          className={`absolute bottom-0 left-0 right-0 bg-white border-t border-orange-100 flex items-stretch ${vistaActiva === "detalle" ? "hidden" : ""}`}
          aria-label="Navegación principal"
        >
          {TABS.map(({ id, etiqueta, Icono }) => {
            const activo = vistaActiva === id;
            return (
              <button
                key={id}
                onClick={() => setVistaActiva(id)}
                aria-current={activo ? "page" : undefined}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors active:scale-95"
              >
                <div
                  className={`flex items-center justify-center rounded-full transition-all ${
                    activo ? "bg-rose-100 w-11 h-8" : "w-11 h-8"
                  }`}
                >
                  <Icono
                    className={`w-5 h-5 ${activo ? "text-rose-600" : "text-stone-400"}`}
                    strokeWidth={activo ? 2.4 : 2}
                  />
                </div>
                <span
                  className={`text-[11px] leading-none ${
                    activo ? "text-rose-600 font-semibold" : "text-stone-400 font-medium"
                  }`}
                >
                  {etiqueta}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
