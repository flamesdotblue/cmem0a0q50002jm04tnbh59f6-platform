import { NextResponse } from 'next/server'
import { assignTasks } from '@/lib/assignment'
import { Employee, Task } from '@/types'

export async function POST(req: Request) {
  try {
    const { employees, tasks }: { employees: Employee[]; tasks: Task[] } = await req.json()
    if (!Array.isArray(employees) || !Array.isArray(tasks)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    const assignments = assignTasks(employees, tasks)
    return NextResponse.json({ assignments })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
