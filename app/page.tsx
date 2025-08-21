import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container-default py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI HR & Operations Platform</h1>
          <nav className="space-x-3">
            <Link href="/manager" className="btn btn-primary">Manager View</Link>
          </nav>
        </div>
      </header>
      <section className="container-default py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Optimize workforce assignment and scheduling</h2>
          <p className="text-gray-600 mb-6">
            Use AI to auto-assign tasks, balance workloads, and build shift schedules with clear visibility for managers.
          </p>
          <Link href="/manager" className="btn btn-primary">Open Manager Dashboard</Link>
        </div>
      </section>
    </main>
  )
}
