import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full p-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Mutual Funds Explorer</h1>
        <p className="text-gray-700 mb-6">Learn about mutual funds, compare options, and see realtime changes in fund NAVs.</p>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
          <Link href="/dashboard" className="px-4 py-2 border rounded">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
