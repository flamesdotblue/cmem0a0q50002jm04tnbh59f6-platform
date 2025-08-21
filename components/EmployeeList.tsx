import { Employee } from '@/types'

export default function EmployeeList({ employees, assignedHours }: { employees: Employee[]; assignedHours: Record<string, number> }) {
  return (
    <div className="card">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Employees</h3>
      </div>
      <ul className="divide-y">
        {employees.map((e) => (
          <li key={e.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{e.name}</div>
              <div className="text-xs text-gray-500">{e.role} • Skills: {e.skills.join(', ')}</div>
              <div className="text-xs text-gray-500">Hours: {assignedHours[e.id] || 0}/{e.capacityHours}</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">{e.workingHours.start}–{e.workingHours.end}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
