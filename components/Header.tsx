import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container-default py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">AI</div>
          <div>
            <div className="font-semibold">Manager Dashboard</div>
            <div className="text-xs text-gray-500">Assignments • Scheduling • Capacity</div>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <Link href="/" className="btn btn-ghost">Home</Link>
        </nav>
      </div>
    </header>
  )
}
