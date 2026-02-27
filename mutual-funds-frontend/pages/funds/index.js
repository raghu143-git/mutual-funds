import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Funds() {
  const [funds, setFunds] = useState([])
  useEffect(()=>{ fetch('/api/funds').then(r=>r.json()).then(setFunds) }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Funds</h1>
      <ul className="space-y-3">
        {funds.map(f=> (
          <li key={f.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-gray-500">Risk: {f.risk}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono">NAV {f.nav.toFixed(2)}</div>
              </div>
              <Link href={`/funds/${f.id}`} className="px-3 py-1 border rounded">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
