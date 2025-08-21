export type Employee = {
  id: string
  name: string
  role: string
  skills: string[]
  capacityHours: number
  workingHours: { start: string; end: string }
}

export type Task = {
  id: string
  title: string
  requiredSkills: string[]
  estimatedHours: number
  priority: number // 1-5
  window: { start: string; end: string }
}

export type Assignment = {
  employeeId: string
  taskId: string
  start: string
  end: string
  hours: number
}
