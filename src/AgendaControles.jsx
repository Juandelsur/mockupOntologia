import {
  Calendar,
  Clock,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Pill,
  FileText,
  CheckCircle2,
  CircleDashed,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export default function AgendaControles({ onVerDetalles }) {
  const [controles] = useState([
    {
      id: 1,
      fecha: "Jueves 18 de junio",
      hora: "10:30 hrs",
      especialidad: "Oncología - Control de seguimiento",
      estado: "pendiente",
    },
    {
      id: 2,
      fecha: "Martes 12 de mayo",
      hora: "09:00 hrs",
      especialidad: "Oncología - Control de seguimiento",
      estado: "realizado",
      receta: "Tamoxifeno 20mg, 1 vez al día por 30 días.",
      notas:
        "Buena evolución general. Sin signos de alarma. Continuar tratamiento habitual y mantener registro diario de síntomas.",
    },
    {
      id: 3,
      fecha: "Lunes 14 de abril",
      hora: "11:15 hrs",
      especialidad: "Mamografía de control",
      estado: "realizado",
      receta: "Sin indicación de nuevos medicamentos.",
      notas:
        "Examen dentro de rango esperado para etapa de remisión. Se solicita repetir en 6 meses.",
    },
    {
      id: 4,
      fecha: "Viernes 6 de marzo",
      hora: "15:45 hrs",
      especialidad: "Oncología - Evaluación general",
      estado: "realizado",
      receta: "Tamoxifeno 20mg, 1 vez al día. Vitamina D 1000 UI, 1 vez al día.",
      notas:
        "Paciente reporta cansancio leve, dentro de lo esperado. Se ajusta horario de toma de medicamento a la noche.",
    },
  ]);

  const [expandidoId, setExpandidoId] = useState(null);

  const alternarExpandido = (control) => {
    if (control.estado !== "realizado") return;
    setExpandidoId(expandidoId === control.id ? null : control.id);
  };

  const manejarClickControl = (control) => {
    if (control.estado === "realizado") {
      alternarExpandido(control);
    } else if (onVerDetalles) {
      onVerDetalles();
    }
  };

  return (
    <div className="w-full max-w-sm min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 px-5 pt-8 pb-10 flex flex-col gap-6">

      {/* Encabezado */}
        <header className="px-1">
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 rounded-full p-2">
              <Calendar className="w-5 h-5 text-amber-700" strokeWidth={2.2} />
            </div>
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
              Mis controles
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mt-3 leading-snug">
            Tu agenda y carnet digital
          </h1>
          <p className="text-stone-500 text-base mt-2 leading-relaxed">
            Toca un control pasado para ver el resumen de esa consulta.
          </p>
        </header>

        {/* Lista de controles */}
        <section className="flex flex-col gap-3">
          {controles.map((control) => {
            const expandido = expandidoId === control.id;
            const esRealizado = control.estado === "realizado";

            return (
              <div
                key={control.id}
                className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden"
              >
                <button
                  onClick={() => manejarClickControl(control)}
                  aria-expanded={esRealizado ? expandido : undefined}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    esRealizado ? "active:bg-orange-50" : "active:bg-rose-50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 rounded-full p-2.5 ${
                      esRealizado ? "bg-emerald-100" : "bg-rose-100"
                    }`}
                  >
                    <Stethoscope
                      className={`w-5 h-5 ${
                        esRealizado ? "text-emerald-600" : "text-rose-500"
                      }`}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-stone-800 leading-snug truncate">
                      {control.especialidad}
                    </p>
                    <div className="flex items-center gap-1.5 text-stone-500 text-sm mt-1">
                      <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>{control.fecha}</span>
                      <span className="text-stone-300">·</span>
                      <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>{control.hora}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        esRealizado
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {esRealizado ? (
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.2} />
                      ) : (
                        <CircleDashed className="w-3.5 h-3.5" strokeWidth={2.2} />
                      )}
                      {esRealizado ? "Realizado" : "Pendiente"}
                    </span>

                    {esRealizado && (
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          expandido ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    )}

                    {!esRealizado && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-500">
                        Ver detalles
                        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                </button>

                {/* Resumen tipo carnet digital */}
                {esRealizado && expandido && (
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t border-orange-100 pt-4">
                    <div className="flex items-start gap-3 bg-amber-50 rounded-2xl p-3.5">
                      <Pill className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <div>
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                          Receta
                        </p>
                        <p className="text-sm text-stone-700 leading-relaxed mt-1">
                          {control.receta}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-rose-50 rounded-2xl p-3.5">
                      <FileText className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <div>
                        <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
                          Notas del médico
                        </p>
                        <p className="text-sm text-stone-700 leading-relaxed mt-1">
                          {control.notas}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Botón historial completo */}
        <button
          className="w-full bg-white hover:bg-orange-50 active:scale-[0.98] transition-all rounded-3xl shadow-sm border border-orange-100 p-4 flex items-center gap-3"
          aria-label="Ver historial completo de controles"
        >
          <div className="bg-orange-100 rounded-full p-2.5 flex-shrink-0">
            <BookOpen className="w-5 h-5 text-orange-600" strokeWidth={2} />
          </div>
          <span className="flex-1 text-left text-base font-bold text-stone-800">
            Ver historial completo
          </span>
          <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0" strokeWidth={2} />
        </button>

        {/* Espacio inferior de respiro */}
        <div className="flex-1 flex items-end justify-center pt-4 pb-2">
          <p className="text-sm text-stone-400 text-center leading-relaxed px-4">
            Cada control queda guardado, nada se pierde 💛
          </p>
        </div>
    </div>
  );
}
