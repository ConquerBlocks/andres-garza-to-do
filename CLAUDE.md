# TaskBoard — Reglas del proyecto

- Stack cerrado: HTML + CSS + JavaScript + React. Nada más.
- Prohibido instalar librerías externas (ni de componentes, ni de drag & drop, ni de estado). Todo se construye a mano.
- Los datos se guardan en localStorage bajo la clave versionada "taskboard:v1".
- Un solo estado global en App; los componentes hijos reciben datos y callbacks por props.
- Trabajamos por fases: haz SOLO lo que pida la fase actual, nada más. No te adelantes.
- Al terminar cada fase: explica brevemente qué has hecho y qué archivos has tocado, y espera mi verificación antes de continuar.
- Código con nombres claros en inglés y comentarios solo donde aporten.
- Enfoque mobile-first en el CSS.

## Estilo visual (respetar SIEMPRE)

- Tema claro: fondo blanco #FFFFFF, texto en negro #000000.
- Superficies (columnas, tarjetas, modales): blanco o blanco cálido, borde 1px #BBB49B (beige cálido).
- Colores de marca: ámbar #FFBF00, naranja #FF8000 (color primario: botones y acentos), terra #FF4000.
  El gradiente linear-gradient(90deg, #FFBF00, #FF8000, #FF4000) se reserva para el CTA principal
  y pequeños acentos — NUNCA como fondo de página ni de secciones.
- Neutros para texto y UI: #222222, #444444, #666666, #AAAAAA, #CCCCCC, #EEEEEE.
- Tipografías (Google Fonts): "Funnel Display" (500/600/700) para títulos y contadores; "Roboto"
  (400/500/700) para el cuerpo y la UI. Definirlas como variables CSS y no usar ninguna otra.
- Radios: 8px en botones, inputs y tarjetas de tarea; 16px en columnas, modales y bottom sheet.
- Sombra de elevación para tarjetas y modales (usarla tal cual):
  0 2px 5px rgba(0,0,0,0.10), 0 9px 9px rgba(0,0,0,0.09), 0 20px 12px rgba(0,0,0,0.05).
- Espaciado en múltiplos de 8px.
- Estados: hover con translateY(-1px) y acento naranja; press scale(0.98); focus visible con outline
  2px #FF8000 con 2px de offset; transiciones de 150ms ease-out. Nada de animaciones grandes.
- Nada de glassmorphism ni backdrop-blur.
- Los colores de categoría (#6366f1, #10b981, #f59e0b) se usan solo como etiqueta/acento pequeño
  dentro de la tarjeta, nunca como fondo completo.
- Prohibido usar emojis en la interfaz.
