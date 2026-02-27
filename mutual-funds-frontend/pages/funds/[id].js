import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Chart from '../../components/Chart'

export default function FundDetail(){
  const router = useRouter()
  const { id } = router.query
  const [fund, setFund] = useState(null)

  useEffect(()=>{
    if(!id) return
    fetch('/api/funds').then(r=>r.json()).then(list=>{
      const f = list.find(x=>String(x.id)===String(id))
      setFund(f)
    })
  }, [id])

  if(!fund) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{fund.name}</h1>
      <div className="text-gray-600 mb-4">Risk: {fund.risk} • NAV: {fund.nav.toFixed(2)}</div>
      <div className="max-w-2xl bg-white p-4 rounded shadow">
        <Chart history={fund.history} />
      </div>
    </div>
  )
}
