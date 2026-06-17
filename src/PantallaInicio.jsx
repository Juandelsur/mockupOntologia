import { Calendar, Clock, Stethoscope, ClipboardPlus, Pill, ChevronRight, Check } from "lucide-react";
import { useState } from "react";

export default function PantallaInicio({
  nombrePaciente = "María",
  proximoControl = {
    fecha: "Jueves 18 de junio",
    hora: "10:30 hrs",
    especialidad: "Oncología - Control de seguimiento",
  },
  medicamento = {
    nombre: "Tamoxifeno",
    hora: "21:00 hrs",
    tomado: false,
  },
  onVerDetalles,
}) {
  const [medicamentoTomado, setMedicamentoTomado] = useState(medicamento.tomado);

  const horaActual = new Date().getHours();
  const saludo =
    horaActual < 12 ? "Buenos días" : horaActual < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="w-full max-w-sm min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 px-5 pt-8 pb-10 flex flex-col gap-6">

      {/* Saludo */}
      <header className="px-1">
        <p className="text-lg text-amber-700 font-medium">{saludo},</p>
        <h1 className="text-3xl font-bold text-stone-800 mt-1">
          {nombrePaciente} 🌿
        </h1>
        <p className="text-stone-500 text-base mt-2 leading-relaxed">
          Hoy es un buen día para cuidarte un poco más.
        </p>
      </header>

      {/* Tarjeta próximo control */}
      <section className="bg-white rounded-3xl shadow-sm border border-orange-100 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 rounded-full p-2">
            <Stethoscope className="w-5 h-5 text-amber-700" strokeWidth={2.2} />
          </div>
          <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
            Próximo control
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold text-stone-800 leading-snug">
            {proximoControl.especialidad}
          </p>
          <div className="flex items-center gap-2 text-stone-600 text-base">
            <Calendar className="w-5 h-5 text-rose-500" strokeWidth={2} />
            <span>{proximoControl.fecha}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600 text-base">
            <Clock className="w-5 h-5 text-rose-500" strokeWidth={2} />
            <span>{proximoControl.hora}</span>
          </div>
        </div>

        <button
          onClick={onVerDetalles}
          className="mt-1 w-full bg-rose-500 hover:bg-rose-600 active:scale-[0.98] transition-all text-white font-semibold text-lg rounded-2xl py-3.5 flex items-center justify-center gap-2 shadow-sm"
          aria-label="Ver detalles del próximo control médico"
        >
          Ver detalles
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </section>

      {/* Acceso rápido: registrar síntomas */}
      <section>
        <button
          className="w-full bg-white hover:bg-orange-50 active:scale-[0.98] transition-all rounded-3xl shadow-sm border border-orange-100 p-5 flex items-center gap-4 text-left"
          aria-label="Registrar síntomas de hoy"
        >
          <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
            <ClipboardPlus className="w-7 h-7 text-orange-600" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-stone-800">
              Registrar síntomas de hoy
            </p>
            <p className="text-sm text-stone-500 mt-0.5">
              Toma menos de un minuto
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-stone-400 flex-shrink-0" strokeWidth={2} />
        </button>
      </section>

      {/* Recordatorio de medicamentos */}
      {medicamento && (
        <section
          className={`rounded-3xl shadow-sm border p-5 flex items-center gap-4 transition-colors ${
            medicamentoTomado
              ? "bg-emerald-50 border-emerald-100"
              : "bg-amber-50 border-amber-100"
          }`}
        >
          <div
            className={`rounded-full p-3 flex-shrink-0 ${
              medicamentoTomado ? "bg-emerald-100" : "bg-amber-100"
            }`}
          >
            <Pill
              className={`w-7 h-7 ${
                medicamentoTomado ? "text-emerald-600" : "text-amber-600"
              }`}
              strokeWidth={2}
            />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-stone-800">
              {medicamento.nombre}
            </p>
            <p className="text-sm text-stone-500 mt-0.5">
              {medicamentoTomado ? "Tomado, ¡bien hecho!" : `Hoy a las ${medicamento.hora}`}
            </p>
          </div>
          <button
            onClick={() => setMedicamentoTomado(!medicamentoTomado)}
            className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              medicamentoTomado
                ? "bg-emerald-500 text-white"
                : "bg-white border-2 border-amber-300 text-amber-400"
            }`}
            aria-label={
              medicamentoTomado
                ? "Marcar medicamento como no tomado"
                : "Marcar medicamento como tomado"
            }
            aria-pressed={medicamentoTomado}
          >
            <Check className="w-6 h-6" strokeWidth={3} />
          </button>
        </section>
      )}

      {/* Espacio inferior de respiro */}
      <div className="flex-1 flex items-end justify-center pt-4 pb-2">
        <p className="text-sm text-stone-400 text-center leading-relaxed px-4">
          Estamos contigo en cada paso de este camino 💛
        </p>
      </div>
    </div>
  );
}
