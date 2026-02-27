import Link from 'next/link'

export default function FundCard({ fund }){
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{fund.name}</div>
          <div className="text-sm text-gray-500">Risk: {fund.risk}</div>
        </div>
        <div className="text-right">
          <div className="font-mono">{fund.nav?.toFixed(2)}</div>
          <div className={`text-sm ${fund.change && parseFloat(fund.change)>0 ? 'text-green-600' : 'text-red-600'}`}>{fund.change ? Number(fund.change).toFixed(3) : ''}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Link href={`/funds/${fund.id}`} className="px-3 py-1 border rounded">Details</Link>
      </div>
    </div>
  )
}
