# SCA-IT · Vista Paciente

Prototipo móvil de acompañamiento para sobrevivientes de cáncer de mama en fase de remisión, desarrollado en el marco del proyecto de innovación SCA-IT (Red de Salud, Hospital Regional de Temuco).

## Qué es esto

Una app mobile-first construida en React + Tailwind CSS que simula la experiencia de una paciente gestionando sus controles médicos, dudas pre-consulta, y acompañamiento continuo. Es un **prototipo navegable**, no un producto en producción: no hay backend, base de datos, ni autenticación.

## Pantallas incluidas

**Inicio** — Resumen del día: próximo control destacado, acceso rápido a registro de síntomas, y recordatorio de medicamentos con marcado de “tomado”.

**Mis dudas** — Módulo de preparación pre-consulta donde la paciente anota preguntas antes de su control, las marca como respondidas o las elimina. Mensaje de privacidad visible.

**Asistente** — Chat conversacional simulado (sin IA real detrás), disponible como espacio de acompañamiento 24/7, con aviso de que no remplaza al equipo médico.

**Mis controles** — Agenda de controles pasados y futuros. Al expandir un control pasado se muestra un resumen tipo carnet digital (receta y notas del médico).

Navegación por barra inferior fija, con `useState` en el componente `App` controlando qué vista se renderiza.

## Qué funciona realmente

El estado de “Mis dudas” y “Asistente” persiste mientras la sesión del navegador esté abierta: si navegas a otra pestaña y vuelves, tus preguntas y la conversación siguen ahí (estado elevado al contenedor `App`, no a cada componente individual). El resto de las pantallas (Inicio, Mis controles) mantienen su propio estado local, que se reinicia al cambiar de vista.

## Qué es mock / no funciona todavía

- No hay backend: todos los datos (controles, recetas, síntomas, mensajes) son arrays fijos en el código.
- La persistencia no sobrevive a un refresh de página (no hay `localStorage` ni servidor).
- El chatbot responde siempre el mismo mensaje genérico tras cualquier input del usuario.
- El botón “Ver historial completo” en Mis Controles es decorativo.
- No hay registro de síntomas funcional aún (el acceso rápido existe en Inicio, pero no lleva a un formulario real).
- No hay geolocalización, videos educativos, ni notificaciones push (mencionados en el brief original, fuera de alcance de esta etapa).

## Stack

React + Vite, Tailwind CSS, lucide-react para iconografía.

## Cómo correrlo

```bash
npm install
npm run dev
```

## Estructura de componentes

```
App.jsx                    → Contenedor principal, maneja navegación y estado de sesión
PantallaInicio.jsx
ModuloDudas.jsx             → Recibe dudas/setDudas como props desde App
ChatbotAcompanamiento.jsx   → Recibe mensajes/setMensajes como props desde App
AgendaControles.jsx
```

## Próximos pasos sugeridos

Conectar a un backend real (API + base de datos) para que los datos persistan entre sesiones; implementar el registro de síntomas diarios; integrar el chatbot con un modelo real con contexto del carnet digital del paciente; agregar autenticación.
