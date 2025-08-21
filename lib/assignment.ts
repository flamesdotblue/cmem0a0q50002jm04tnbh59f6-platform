import { Assignment, Employee, Task } from '@/types'

function timeOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  const s1 = toMin(aStart), e1 = toMin(aEnd)
  const s2 = toMin(bStart), e2 = toMin(bEnd)
  const start = Math.max(s1, s2)
  const end = Math.min(e1, e2)
  const overlap = Math.max(0, end - start)
  return { minutes: overlap, startMin: start, endMin: end }
}

export function assignTasks(employees: Employee[], tasks: Task[]): Assignment[] {
  // Greedy heuristic: sort tasks by priority then hours desc, assign to best-fit employee by skills, remaining capacity, and time window overlap.
  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority || b.estimatedHours - a.estimatedHours)

  const remainingCapacity = new Map<string, number>()
  const assigned: Assignment[] = []

  for (const e of employees) remainingCapacity.set(e.id, e.capacityHours)

  for (const task of sortedTasks) {
    let bestEmp: Employee | null = null
    let bestScore = -Infinity
    let bestWindow: { start: string; end: string } | null = null

    for (const emp of employees) {
      // Skill coverage
      const skillsCovered = task.requiredSkills.every(s => emp.skills.includes(s))
      if (!skillsCovered) continue

      // Capacity check
      const remain = remainingCapacity.get(emp.id) || 0
      if (remain < task.estimatedHours) continue

      // Time window overlap between task window and employee working hours
      const { minutes, startMin } = timeOverlap(emp.workingHours.start, emp.workingHours.end, task.window.start, task.window.end)
      if (minutes < task.estimatedHours * 60) continue

      // Score: prioritize higher priority, more overlap, balance by remaining capacity, light penalty for overqualified (extra skills don't matter here)
      const score = task.priority * 10 + minutes / 30 + (remain - task.estimatedHours)
      if (score > bestScore) {
        bestScore = score
        bestEmp = emp
        const startMinutes = Math.max(startMin, timeToMin(emp.workingHours.start))
        const startHH = minToTime(startMinutes)
        const endHH = minToTime(startMinutes + task.estimatedHours * 60)
        bestWindow = { start: startHH, end: endHH }
      }
    }

    if (bestEmp && bestWindow) {
      assigned.push({ employeeId: bestEmp.id, taskId: task.id, start: bestWindow.start, end: bestWindow.end, hours: task.estimatedHours })
      remainingCapacity.set(bestEmp.id, (remainingCapacity.get(bestEmp.id) || 0) - task.estimatedHours)
    }
  }

  return assigned
}

function timeToMin(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function minToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
