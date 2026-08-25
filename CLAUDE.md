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

- Tema oscuro: fondo #000000, superficies/tarjetas #161616 con borde 1px #222222.
- Colores de marca: ámbar #FFBF00, naranjargb(116, 104, 92) (color primario, botones y acentos), terra #FF4000.
  Gradiente de marca para momentos destacados: linear-gradient(90deg, #FFBF00, #FF8000, #FF4000).
- Neutros para texto: #FFFFFF títulos, #CCCCCC cuerpo, #AAAAAA secundario, #666666 apagado.
- Tipografías (Google Fonts): "Funnel Display" (600/700) para títulos y cifras; "Roboto" (400/500/700)
  para el cuerpo y la UI. Definirlas como variables CSS y no usar ninguna otra.
- Radios: 8px en botones, inputs y tarjetas de tarea; 16px en columnas, modales y bottom sheet.
- Espaciado en múltiplos de 8px.
- Estados: hover con translateY(-1px) y acento naranja; focus visible con outline 2px #FF8000;
  transiciones de 150ms ease-out. Nada de animaciones grandes.
- Los colores de categoría (#6366f1, #10b981, #f59e0b) se usan solo como etiqueta/acento pequeño
  dentro de la tarjeta, nunca como fondo completo.
- Prohibido usar emojis en la interfaz.
