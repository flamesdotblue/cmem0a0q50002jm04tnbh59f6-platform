import { Task } from '@/types'

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="card">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Tasks</h3>
      </div>
      <ul className="divide-y">
        {tasks.map((t) => (
          <li key={t.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-gray-500">Skills: {t.requiredSkills.join(', ')} • Est: {t.estimatedHours}h • Priority: {t.priority}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{t.window.start}–{t.window.end}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
