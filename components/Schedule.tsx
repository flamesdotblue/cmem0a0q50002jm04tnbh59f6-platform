import { Assignment, Employee, Task } from '@/types'

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function toHHMM(mins: number) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function Schedule({ employees, assignments, tasks }: { employees: Employee[]; assignments: Assignment[]; tasks: Task[] }) {
  // compute timeline window
  const start = Math.min(...employees.map(e => toMinutes(e.workingHours.start)))
  const end = Math.max(...employees.map(e => toMinutes(e.workingHours.end)))
  const total = end - start

  const assignmentsByEmp: Record<string, (Assignment & { task: Task })[]> = {}
  for (const a of assignments) {
    const task = tasks.find(t => t.id === a.taskId)
    if (!task) continue
    assignmentsByEmp[a.employeeId] = assignmentsByEmp[a.employeeId] || []
    assignmentsByEmp[a.employeeId].push({ ...a, task })
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Schedule (Today)</h3>
        <div className="text-xs text-gray-500">{toHHMM(start)}–{toHHMM(end)}</div>
      </div>
      <div className="space-y-6">
        {employees.map((e) => (
          <div key={e.id}>
            <div className="text-sm font-medium mb-2">{e.name}</div>
            <div className="relative h-16 w-full bg-gray-100 rounded-lg overflow-hidden border">
              {/* grid hours */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: Math.ceil(total / 60) }).map((_, i) => (
                  <div key={i} className="h-full border-r border-gray-200" style={{ width: `${(60 / total) * 100}%` }} />
                ))}
              </div>
              {/* assignments */}
              {(assignmentsByEmp[e.id] || []).map((a, idx) => {
                const s = toMinutes(a.start)
                const width = (a.hours * 60) / total * 100
                const left = ((s - start) / total) * 100
                return (
                  <div
                    key={idx}
                    className="absolute top-1 h-14 rounded-md text-xs text-white flex items-center px-2 shadow"
                    style={{ left: `${left}%`, width: `${width}%`, backgroundColor: '#2563eb' }}
                    title={`${a.task.title} • ${a.start}–${a.end}`}
                  >
                    <div className="truncate">{a.task.title}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
