import Column from './Column.jsx'
import './Board.css'

// Sample data for the static layout. Will be replaced by real state in later phases.
const CATEGORIES = {
  design: { name: 'Diseño', color: '#6366f1' },
  dev: { name: 'Desarrollo', color: '#10b981' },
  marketing: { name: 'Marketing', color: '#f59e0b' },
}

const COLUMNS = [
  {
    id: 'todo',
    title: 'Pendiente',
    tasks: [
      { id: 't1', title: 'Definir paleta de colores', category: CATEGORIES.design, priority: 'medium' },
      { id: 't2', title: 'Configurar dominio y hosting', category: CATEGORIES.dev, priority: 'high' },
      { id: 't3', title: 'Redactar post de lanzamiento', category: CATEGORIES.marketing, priority: 'low' },
    ],
  },
  {
    id: 'doing',
    title: 'En progreso',
    tasks: [
      { id: 't4', title: 'Maquetar el tablero', category: CATEGORIES.dev, priority: 'high' },
      { id: 't5', title: 'Diseñar iconografía de categorías', category: CATEGORIES.design, priority: 'low' },
    ],
  },
  {
    id: 'done',
    title: 'Hecho',
    tasks: [
      { id: 't6', title: 'Crear proyecto con Vite', category: CATEGORIES.dev, priority: 'medium' },
      { id: 't7', title: 'Elegir tipografías', category: CATEGORIES.design, priority: 'medium' },
      { id: 't8', title: 'Preparar calendario de contenidos', category: CATEGORIES.marketing, priority: 'high' },
    ],
  },
]

function Board() {
  return (
    <section className="board" aria-label="Tablero de tareas">
      {COLUMNS.map((column) => (
        <Column key={column.id} title={column.title} tasks={column.tasks} />
      ))}
    </section>
  )
}

export default Board
