"use client"

import { useMemo, useState } from 'react'
import Header from '@/components/Header'
import EmployeeList from '@/components/EmployeeList'
import TaskList from '@/components/TaskList'
import Schedule from '@/components/Schedule'
import KPICards from '@/components/KPICards'
import { Employee, Task, Assignment } from '@/types'

export default function ManagerPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'e1', name: 'Alex Johnson', role: 'Support Specialist', skills: ['support', 'email', 'chat'], capacityHours: 6, workingHours: { start: '09:00', end: '17:00' } },
    { id: 'e2', name: 'Priya Singh', role: 'Field Technician', skills: ['install', 'repair', 'network'], capacityHours: 8, workingHours: { start: '08:00', end: '16:00' } },
    { id: 'e3', name: 'Marco Rossi', role: 'Analyst', skills: ['excel', 'report', 'analysis'], capacityHours: 5, workingHours: { start: '10:00', end: '18:00' } },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'AM Support Queue', requiredSkills: ['support'], estimatedHours: 3, priority: 3, window: { start: '09:00', end: '12:00' } },
    { id: 't2', title: 'On-site Router Install', requiredSkills: ['install', 'network'], estimatedHours: 4, priority: 5, window: { start: '08:30', end: '15:00' } },
    { id: 't3', title: 'Weekly Performance Report', requiredSkills: ['report', 'excel'], estimatedHours: 2, priority: 2, window: { start: '11:00', end: '17:00' } },
    { id: 't4', title: 'Device Repair Ticket', requiredSkills: ['repair'], estimatedHours: 3, priority: 4, window: { start: '13:00', end: '17:00' } },
  ])

  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalHours = useMemo(() => tasks.reduce((a, t) => a + t.estimatedHours, 0), [tasks])
  const assignedHoursByEmployee = useMemo(() => {
    const map: Record<string, number> = {}
    for (const a of assignments) {
      map[a.employeeId] = (map[a.employeeId] || 0) + a.hours
    }
    return map
  }, [assignments])

  async function autoAssign() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employees, tasks })
      })
      if (!res.ok) throw new Error('Failed to assign')
      const data = await res.json()
      setAssignments(data.assignments)
    } catch (e: any) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container-default py-6 space-y-6">
        <KPICards
          totalEmployees={employees.length}
          totalTasks={tasks.length}
          totalHours={totalHours}
          utilization={
            employees.length
              ? Math.round((Object.values(assignedHoursByEmployee).reduce((a, b) => a + b, 0) / (employees.reduce((a, e) => a + e.capacityHours, 0) || 1)) * 100)
              : 0
          }
        />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Planner</h2>
          <div className="flex items-center gap-2">
            <button onClick={autoAssign} className="btn btn-primary" disabled={loading}>
              {loading ? 'Assigning…' : 'Auto-Assign with AI'}
            </button>
            <button onClick={() => setAssignments([])} className="btn btn-ghost">Clear</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <EmployeeList employees={employees} assignedHours={assignedHoursByEmployee} />
            <TaskList tasks={tasks} />
          </div>
          <div className="lg:col-span-2">
            <Schedule employees={employees} assignments={assignments} tasks={tasks} />
          </div>
        </div>

        {error && (
          <div className="card p-4 text-sm text-red-600">{error}</div>
        )}
      </div>
    </main>
  )
}
