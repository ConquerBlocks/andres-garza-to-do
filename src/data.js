// Data model for the board. Persisted shape is versioned (see `version`).

export const STATUSES = [
  { id: 'todo', title: 'Pendiente' },
  { id: 'in_progress', title: 'En progreso' },
  { id: 'done', title: 'Hecho' },
]

export const PRIORITIES = ['low', 'medium', 'high']

function createTask({ title, description, status, category, priority }) {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title,
    description,
    status,
    category,
    priority,
    createdAt: now,
    updatedAt: now,
  }
}

export const sampleBoard = {
  version: 1,
  tasks: [
    createTask({
      title: 'Preparar informe semanal',
      description: 'Recopilar métricas del equipo y redactar el resumen para dirección.',
      status: 'todo',
      category: 'trabajo',
      priority: 'high',
    }),
    createTask({
      title: 'Comprar material de oficina',
      description: 'Papel, tóner y cuadernos.',
      status: 'todo',
      category: 'personal',
      priority: 'low',
    }),
    createTask({
      title: 'Leer capítulo 4 del libro de React',
      description: 'Hooks avanzados y patrones de composición.',
      status: 'todo',
      category: 'estudio',
      priority: 'medium',
    }),
    createTask({
      title: 'Revisar pull request del equipo',
      description: 'Revisar los cambios del módulo de facturación.',
      status: 'in_progress',
      category: 'trabajo',
      priority: 'high',
    }),
    createTask({
      title: 'Planificar viaje de fin de semana',
      description: 'Buscar alojamiento y reservar transporte.',
      status: 'in_progress',
      category: 'personal',
      priority: 'medium',
    }),
    createTask({
      title: 'Ejercicios de algoritmos',
      description: 'Resolver tres problemas de grafos.',
      status: 'done',
      category: 'estudio',
      priority: 'medium',
    }),
    createTask({
      title: 'Renovar el carnet de la biblioteca',
      description: 'Llevar el DNI y el formulario firmado.',
      status: 'done',
      category: 'personal',
      priority: 'low',
    }),
    createTask({
      title: 'Configurar entorno de desarrollo',
      description: 'Instalar Node, Vite y las extensiones del editor.',
      status: 'done',
      category: 'trabajo',
      priority: 'high',
    }),
  ],
  categories: [
    { id: 'trabajo', name: 'Trabajo', color: '#6366f1' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'estudio', name: 'Estudio', color: '#f59e0b' },
  ],
}
