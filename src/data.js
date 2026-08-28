// Data model for the board. Persisted shape is versioned (see `version`).

export const STATUSES = [
  { id: 'todo', title: 'Pendiente' },
  { id: 'in_progress', title: 'En progreso' },
  { id: 'done', title: 'Hecho' },
]

export const PRIORITIES = ['low', 'medium', 'high']

export function createTask({ title, description, status, category, priority }) {
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
      title: 'Preparar la presentación del sprint',
      description: 'Resumen de objetivos, demo de las funcionalidades nuevas y próximos pasos.',
      status: 'todo',
      category: 'trabajo',
      priority: 'medium',
    }),
    createTask({
      title: 'Pedir cita con el dentista',
      description: 'Revisión anual; preguntar por la limpieza.',
      status: 'todo',
      category: 'personal',
      priority: 'medium',
    }),
    createTask({
      title: 'Practicar Tailwind con un proyecto pequeño',
      description: 'Maquetar una landing con utilidades y modo oscuro.',
      status: 'todo',
      category: 'estudio',
      priority: 'low',
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
      title: 'Curso de accesibilidad web',
      description: 'Módulo 3: formularios, foco visible y lectores de pantalla.',
      status: 'in_progress',
      category: 'estudio',
      priority: 'high',
    }),
    createTask({
      title: 'Actualizar dependencias del proyecto',
      description: 'Subir Vite y React a la última versión y comprobar que el build sigue limpio.',
      status: 'in_progress',
      category: 'trabajo',
      priority: 'low',
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
      title: 'Apuntarse al gimnasio',
      description: 'Matrícula hecha; primera clase el lunes.',
      status: 'done',
      category: 'personal',
      priority: 'medium',
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
