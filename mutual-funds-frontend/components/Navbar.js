import Link from 'next/link'

export default function Navbar(){
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-lg">MutualFunds</div>
        <nav className="flex gap-3 items-center">
          <Link href="/" className="text-sm">Home</Link>
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <Link href="/funds" className="text-sm">Funds</Link>
          <Link href="/advisor" className="text-sm">Advisor</Link>
          <Link href="/admin" className="text-sm">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
