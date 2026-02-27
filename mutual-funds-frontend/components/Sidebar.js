import Link from 'next/link'

export default function Sidebar(){
  return (
    <aside className="sidebar bg-white border-r shadow-sm flex-shrink-0">
      <div className="p-6 text-2xl font-bold">MutualFunds</div>
      <nav className="flex flex-col gap-1 p-2 text-gray-700">
        <Link href="/dashboard" className="py-2 px-4 hover:bg-gray-200 rounded">Dashboard</Link>
        <Link href="/funds" className="py-2 px-4 hover:bg-gray-200 rounded">Funds</Link>
        <Link href="/advisor" className="py-2 px-4 hover:bg-gray-200 rounded">Advisor</Link>
        <Link href="/admin" className="py-2 px-4 hover:bg-gray-200 rounded">Admin</Link>
      </nav>
    </aside>
  )
}
