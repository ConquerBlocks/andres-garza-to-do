# Blocks To-Do — Reglas del proyecto

- Nombre visible del producto: "Blocks To-Do" (cabecera y `<title>`). Las claves de localStorage y el nombre
  del paquete siguen siendo `taskboard`; no renombrarlos.

- Stack cerrado: HTML + JavaScript + React + Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`). Nada más.
- Prohibido instalar más librerías externas (ni de componentes, ni de drag & drop, ni de estado). Tailwind
  se usa solo como utilidades: los componentes (botones, modales, tarjetas, chips) se construyen a mano.
- Los datos se guardan en localStorage bajo la clave versionada "taskboard:v1".
- Un solo estado global en App; los componentes hijos reciben datos y callbacks por props.
- Trabajamos por fases: haz SOLO lo que pida la fase actual, nada más. No te adelantes.
- Al terminar cada fase: explica brevemente qué has hecho y qué archivos has tocado, y espera mi verificación antes de continuar.
- Código con nombres claros en inglés y comentarios solo donde aporten.
- Enfoque mobile-first en el CSS.

## Estilo visual (respetar SIEMPRE) — tomado de conquerblocks.com

- Dos temas con los MISMOS tokens; el oscuro es el predeterminado y se cambia con el switch de la cabecera
  (`ThemeSwitch.jsx`, estado `theme` en `App`, persistido en localStorage bajo "taskboard:theme" y aplicado
  como `data-theme` en `<html>`). Nunca usar `dark:` en componentes: se cambia el valor del token en `index.css`.
- Tema oscuro (por defecto): fondo negro #000000 con rejilla sutil de 40px (líneas blancas al 5%, en CSS,
  sin imágenes), columnas #0A0A0A, tarjetas/modales/inputs #171717, borde 1px #404040, líneas interiores
  #262626. Texto: #FAFAFA títulos, #F6F6F6 cuerpo, #E5E5E5 secundario, #A3A3A3 apagado.
- Tema claro: fondo crema #F3F0E8 (papel), columnas #FAF8F3, tarjetas/modales/inputs blanco #FFFFFF,
  borde 1px #BBB49B (beige), líneas interiores #E5E5E5. Texto: #0A0A0A, #171717, #262626, #737373 apagado.
- Colores de marca: ámbar #FFBF00, naranja #FF7700 (acentos, hover, chip activo, focus), terra #FF4000.
  Gradiente de marca linear-gradient(135deg, #FFBF00, #FF4000): fondo de los botones primarios y del FAB,
  y texto destacado en títulos (`text-brand-gradient`, p. ej. "Blocks" en "Blocks To-Do"). NUNCA como fondo
  de página, secciones, columnas ni tarjetas.
- Neutros (escala del sitio): #0A0A0A, #171717, #262626, #404040, #525252, #737373, #A3A3A3, #D4D4D4,
  #E5E5E5, #F6F6F6, #FAFAFA.
- Tipografías (Google Fonts): "Funnel Display" (500/600/700) para títulos, contadores y texto de botones;
  "Roboto" (400/500/700) para el cuerpo y la UI. Definirlas como tokens en `@theme` (`font-display`,
  `font-body`) y no usar ninguna otra.
- Botones (`Button.jsx`):
  - `primary`: bloque con gradiente de marca, texto blanco, SIN radio, silueta pixelada (`clip-pixel`,
    mismo polígono que la web), flecha ↗ a la derecha, hover `scale(1.025)` + animación
    `animate-pixel-glitch` (150ms, 3 pasos secos, sin easing).
  - `danger`: el mismo bloque pixelado en terra sólido.
  - `secondary`: enlace de texto subrayado (así lo hace la web), hover naranja.
  - El resto de controles (chips, pestañas, cerrar, mover, inputs) mantienen borde 1px y radio 8px.
- Radios: 0 en botones primarios/peligro y FAB (bloques pixelados); 8px en inputs, chips y tarjetas de tarea;
  16px en columnas, modales y bottom sheet.
- Sombra de elevación para tarjetas y modales (usarla tal cual, en oscuro es más intensa):
  0 2px 5px rgba(0,0,0,0.10), 0 9px 9px rgba(0,0,0,0.09), 0 20px 12px rgba(0,0,0,0.05).
- Espaciado en múltiplos de 8px.
- Estados: hover con translateY(-1px) y acento naranja en tarjetas y controles con borde; press scale(0.98);
  focus visible con outline 2px #FF7700 con 2px de offset; transiciones de 150ms ease-out. Nada de
  animaciones grandes (la única animación es el glitch de 150ms de los botones pixelados).
- Motivo de marca: pequeños clústeres de cuadrados pixelados en ámbar/naranja/terra (SVG inline,
  `aria-hidden`), solo como acento junto al título. No abusar.
- Nada de glassmorphism ni backdrop-blur.
- Los colores de categoría (#6366f1, #10b981, #f59e0b) se usan solo como etiqueta/acento pequeño
  dentro de la tarjeta, nunca como fondo completo.
- Prohibido usar emojis en la interfaz. Iconos solo como SVG inline con `aria-hidden` (luna del switch,
  flecha ↗ del botón primario, clúster de píxeles).

## Convenciones del código (mantener en fases futuras)

- Estructura: `src/data.js` (modelo, `STATUSES`, `PRIORITIES`, `createTask`, tablero de ejemplo),
  `src/storage.js` (`loadBoard`/`saveBoard` con try/catch), `src/components/<Nombre>.jsx`. No hay CSS por
  componente: todo el estilo va como utilidades de Tailwind en el `className` del JSX. Las cadenas largas
  que se repiten se extraen a constantes (`INPUT_CLASSES`) o a componentes compartidos (`Button.jsx` con
  variantes primary/secondary/danger, `CloseButton.jsx`).
- Todo el estado vive en `App.jsx` (`board`, formulario, tarea seleccionada, pestaña activa, búsqueda,
  filtro). Solo se permite `useState` local para estado efímero de UI (campos de formulario, drag-over).
- Las tareas se localizan SIEMPRE por `id` (`find`/`map`/`filter`), nunca por índice. Toda mutación
  de una tarea actualiza `updatedAt`.
- Tokens de diseño solo en el bloque `@theme` de `src/index.css`; la paleta, fuentes, radios y sombras por
  defecto de Tailwind están anuladas (`--color-*: initial`, etc.), así que solo existen las utilidades del
  proyecto. Ningún color arbitrario (`bg-[#…]`) en los componentes. Utilidades disponibles:
  - Colores: `bg`/`surface`/`surface-raised` (superficies), `line`/`line-subtle` (bordes), `overlay`,
    `amber`/`orange`/`terra` (marca), `title`/`body`/`secondary`/`muted`/`neutral`/`neutral-light` (texto),
    `category-indigo`/`category-emerald`/`category-amber`. Ej.: `bg-surface`, `border-line`, `text-muted`.
  - `font-display`, `font-body`; `rounded-sm` (8px) y `rounded-lg` (16px); `shadow-elevation`;
    `transition` ya es 150ms ease-out; `bg-brand-gradient`, `text-brand-gradient`, `clip-pixel` y
    `animate-pixel-glitch` para los elementos de marca; `text-white` solo sobre gradiente/terra.
  - Espaciado con la escala estándar en múltiplos de 8px: `p-2` = 8px, `gap-4` = 16px, `p-6` = 24px, `p-8` = 32px.
  - Colores dinámicos (categoría) vía variable CSS en `style` y `bg-(--category-color)`.
  - Estados: `hover:-translate-y-px hover:border-orange`, `active:scale-98`, variantes `aria-pressed:`,
    `aria-selected:` (con `group-aria-selected:` en hijos), `enabled:` / `disabled:`.
- Breakpoints (solo estos dos, definidos en `@theme`): móvil < 640px (base), tablet `sm:` (≥ 640px),
  escritorio `lg:` (≥ 1024px).
- Interacción por tamaño: en móvil una columna + pestañas, botones ← / → para mover, bottom sheets y FAB;
  desde 640px tres columnas, drag & drop nativo, modal centrado y panel lateral de detalle.
- Objetivos táctiles ≥ 44px (`min-h-11`, `size-11`); inputs y selects con `text-base` (16px).
- Verificación antes de cada commit: `npm run build` y `npm run lint` limpios y comprobación visual en
  Chrome (móvil ~390px y escritorio 1280px).
- Commits en español con el formato `fase N: descripción corta`.
