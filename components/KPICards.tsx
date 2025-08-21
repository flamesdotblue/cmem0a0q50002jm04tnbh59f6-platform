type Props = {
  totalEmployees: number
  totalTasks: number
  totalHours: number
  utilization: number
}

export default function KPICards({ totalEmployees, totalTasks, totalHours, utilization }: Props) {
  const items = [
    { label: 'Employees', value: totalEmployees },
    { label: 'Tasks', value: totalTasks },
    { label: 'Planned Hours', value: totalHours },
    { label: 'Capacity Utilization', value: `${utilization}%` },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((i) => (
        <div key={i.label} className="card p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">{i.label}</div>
          <div className="text-2xl font-semibold mt-1">{i.value}</div>
        </div>
      ))}
    </div>
  )
}
