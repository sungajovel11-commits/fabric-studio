export interface CanvasProject {
  id: string
  ownerEmail: string
  title: string
  width: number
  height: number
  thumbnail: string
  canvasJson: string
  objectCount: number
  updatedAt: string
}

export const useProjects = () => {
  const STORAGE_KEY = 'fabric_studio_projects_v1'
  const projects = useState<CanvasProject[]>('fabric_projects', () => [])

  const loadProjects = (ownerEmail: string) => {
    if (!import.meta.client || !ownerEmail) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const all: CanvasProject[] = raw ? JSON.parse(raw) : []
      projects.value = all
        .filter((p) => p.ownerEmail === ownerEmail)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
    } catch {
      projects.value = []
    }
  }

  const getProjectById = (id: string): CanvasProject | null => {
    if (!import.meta.client) return null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const all: CanvasProject[] = raw ? JSON.parse(raw) : []
      return all.find((p) => p.id === id) || null
    } catch {
      return null
    }
  }

  const saveProject = (project: CanvasProject) => {
    if (!import.meta.client) return
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: CanvasProject[] = raw ? JSON.parse(raw) : []
    const index = all.findIndex((p) => p.id === project.id)

    if (index >= 0) {
      all[index] = project
    } else {
      all.unshift(project)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    loadProjects(project.ownerEmail)
  }

  const deleteProject = (id: string, ownerEmail: string) => {
    if (!import.meta.client) return
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: CanvasProject[] = raw ? JSON.parse(raw) : []
    const filtered = all.filter((p) => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    loadProjects(ownerEmail)
  }

  const transferProjectsOwner = (oldEmail: string, newEmail: string) => {
    if (!import.meta.client || oldEmail === newEmail) return
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: CanvasProject[] = raw ? JSON.parse(raw) : []
    const updated = all.map((p) =>
      p.ownerEmail === oldEmail ? { ...p, ownerEmail: newEmail } : p
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    loadProjects(newEmail)
  }

  return {
    projects,
    loadProjects,
    getProjectById,
    saveProject,
    deleteProject,
    transferProjectsOwner,
  }
}