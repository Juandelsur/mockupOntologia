import {
  Calendar,
  Clock,
  Stethoscope,
  ArrowLeft,
  FlaskConical,
  ClipboardList,
  Plus,
  Trash2,
  MapPin,
  User,
} from "lucide-react";
import { useState } from "react";

export default function DetalleControlPendiente({ onVolver }) {
  const control = {
    especialidad: "Oncología - Control de seguimiento",
    fecha: "Jueves 18 de junio",
    hora: "10:30 hrs",
    medico: "Dr. Rodrigo Fuentes",
    lugar: "Clínica Las Condes, Block C, Piso 3",
  };

  const [examenes, setExamenes] = useState([
    { id: 1, texto: "Hemograma completo" },
    { id: 2, texto: "Perfil hepático" },
  ]);

  const [solicitudes, setSolicitudes] = useState([
    { id: 1, texto: "Traer resultados de mamografía de abril" },
  ]);

  const [nuevoExamen, setNuevoExamen] = useState("");
  const [nuevaSolicitud, setNuevaSolicitud] = useState("");

  const agregarExamen = () => {
    if (!nuevoExamen.trim()) return;
    setExamenes([...examenes, { id: examenes.length + Date.now(), texto: nuevoExamen.trim() }]);
    setNuevoExamen("");
  };

  const eliminarExamen = (id) => setExamenes(examenes.filter((e) => e.id !== id));

  const agregarSolicitud = () => {
    if (!nuevaSolicitud.trim()) return;
    setSolicitudes([...solicitudes, { id: solicitudes.length + Date.now(), texto: nuevaSolicitud.trim() }]);
    setNuevaSolicitud("");
  };

  const eliminarSolicitud = (id) => setSolicitudes(solicitudes.filter((s) => s.id !== id));

  return (
    <div className="w-full max-w-sm min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 px-5 pt-8 pb-10 flex flex-col gap-6">

      {/* Encabezado con botón volver */}
      <header className="flex items-center gap-3 px-1">
        <button
          onClick={onVolver}
          className="bg-white rounded-full p-2.5 shadow-sm border border-orange-100 active:scale-95 transition-all flex-shrink-0"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-stone-600" strokeWidth={2} />
        </button>
        <div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
            Detalle del control
          </span>
          <h1 className="text-xl font-bold text-stone-800 leading-snug">
            Control pendiente
          </h1>
        </div>
      </header>

      {/* Información de la cita */}
      <section className="bg-white rounded-3xl shadow-sm border border-rose-100 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 rounded-full p-2">
            <Stethoscope className="w-5 h-5 text-rose-500" strokeWidth={2.2} />
          </div>
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
            Próxima cita
          </span>
        </div>

        <p className="text-lg font-bold text-stone-800 leading-snug">
          {control.especialidad}
        </p>

        <div className="flex items-center gap-2 text-stone-600 text-sm">
          <Calendar className="w-4 h-4 text-rose-400 flex-shrink-0" strokeWidth={2} />
          <span>{control.fecha}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-600 text-sm">
          <Clock className="w-4 h-4 text-rose-400 flex-shrink-0" strokeWidth={2} />
          <span>{control.hora}</span>
        </div>

        <div className="border-t border-orange-100 pt-3 flex flex-col gap-2">
          <div className="flex items-start gap-2 text-stone-500 text-sm">
            <User className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <span>
              <span className="font-semibold text-stone-700">Médico: </span>
              {control.medico}
            </span>
          </div>
          <div className="flex items-start gap-2 text-stone-500 text-sm">
            <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <span>
              <span className="font-semibold text-stone-700">Lugar: </span>
              {control.lugar}
            </span>
          </div>
        </div>
      </section>

      {/* Exámenes a llevar */}
      <section className="bg-white rounded-3xl shadow-sm border border-orange-100 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 rounded-full p-2">
            <FlaskConical className="w-5 h-5 text-amber-600" strokeWidth={2.2} />
          </div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
            Exámenes a llevar
          </span>
        </div>

        {examenes.length === 0 && (
          <p className="text-sm text-stone-400 italic">
            No hay exámenes registrados aún.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {examenes.map((ex) => (
            <div
              key={ex.id}
              className="flex items-center gap-3 bg-amber-50 rounded-2xl px-3.5 py-2.5"
            >
              <p className="flex-1 text-sm text-stone-700">{ex.texto}</p>
              <button
                onClick={() => eliminarExamen(ex.id)}
                aria-label="Eliminar examen"
                className="text-stone-300 hover:text-rose-400 active:scale-90 transition-all"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={nuevoExamen}
            onChange={(e) => setNuevoExamen(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarExamen()}
            placeholder="Ej: glucosa, TAC, ecografía..."
            className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl px-3.5 py-2.5 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-amber-300 transition-colors"
          />
          <button
            onClick={agregarExamen}
            aria-label="Agregar examen"
            className="bg-amber-100 hover:bg-amber-200 active:scale-95 transition-all rounded-2xl px-3 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-amber-700" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* Solicitudes del médico */}
      <section className="bg-white rounded-3xl shadow-sm border border-orange-100 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 rounded-full p-2">
            <ClipboardList className="w-5 h-5 text-rose-500" strokeWidth={2.2} />
          </div>
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
            Solicitudes del médico
          </span>
        </div>

        {solicitudes.length === 0 && (
          <p className="text-sm text-stone-400 italic">
            Sin solicitudes registradas aún.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {solicitudes.map((sol) => (
            <div
              key={sol.id}
              className="flex items-center gap-3 bg-rose-50 rounded-2xl px-3.5 py-2.5"
            >
              <p className="flex-1 text-sm text-stone-700">{sol.texto}</p>
              <button
                onClick={() => eliminarSolicitud(sol.id)}
                aria-label="Eliminar solicitud"
                className="text-stone-300 hover:text-rose-400 active:scale-90 transition-all"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={nuevaSolicitud}
            onChange={(e) => setNuevaSolicitud(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarSolicitud()}
            placeholder="Ej: traer carnet anterior, formulario..."
            className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl px-3.5 py-2.5 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-rose-300 transition-colors"
          />
          <button
            onClick={agregarSolicitud}
            aria-label="Agregar solicitud"
            className="bg-rose-100 hover:bg-rose-200 active:scale-95 transition-all rounded-2xl px-3 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-rose-500" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* Pie de página */}
      <div className="flex-1 flex items-end justify-center pt-4 pb-2">
        <p className="text-sm text-stone-400 text-center leading-relaxed px-4">
          Llegar preparada hace la diferencia 💛
        </p>
      </div>
    </div>
  );
}
