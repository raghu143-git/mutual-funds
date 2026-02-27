import { useEffect, useState } from 'react'
import FundCard from '../components/FundCard'
import PieChart from '../components/PieChart'
import Chart from '../components/Chart'

export default function Dashboard() {
  const [funds, setFunds] = useState([])

  useEffect(()=>{
    fetch('/api/funds').then(r=>r.json()).then(setFunds)

    const es = new EventSource('/api/realtime')
    es.onmessage = (evt) => {
      try {
        const update = JSON.parse(evt.data)
        setFunds(prev => prev.map(f=> f.id===update.id ? {...f, nav:update.nav, change:update.change, history: [...(f.history||[]).slice(-4), update.nav]} : f))
      } catch(e){}
    }
    return ()=> es.close()
  }, [])

  // demo allocation for pie chart
  const allocation = funds.reduce((acc,f)=> (acc[f.name]=Math.round((f.nav||0)%100), acc), {})

  // compute simple metrics
  const totalNAV = funds.reduce((s,f)=>s+ (f.nav||0),0).toFixed(2)
  const todayChange = funds.reduce((s,f)=>s+ (parseFloat(f.change)||0),0).toFixed(2)
  const highRisk = funds.filter(f=>f.risk && f.risk.toLowerCase().includes('high')).length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow card">
          <div className="text-sm uppercase text-gray-500">Total NAV</div>
          <div className="text-xl font-semibold">${totalNAV}</div>
        </div>
        <div className="p-4 bg-white rounded shadow card">
          <div className="text-sm uppercase text-gray-500">Change Today</div>
          <div className={`text-xl font-semibold ${todayChange>=0 ? 'text-green-600' : 'text-red-600'}`}>{todayChange}</div>
        </div>
        <div className="p-4 bg-white rounded shadow card">
          <div className="text-sm uppercase text-gray-500">High Risk Funds</div>
          <div className="text-xl font-semibold">{highRisk}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funds.map(f=> <FundCard key={f.id} fund={f} />)}
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Portfolio Allocation</h2>
          <PieChart data={allocation} />
          <div className="mt-4">
            <h3 className="font-semibold">Overview</h3>
            <p className="text-sm text-gray-600">Realtime NAV updates stream in; charts show profit/loss coloring.</p>
          </div>
        </aside>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">NAV History (Selected funds)</h2>
        <div className="max-w-3xl">
          <Chart history={(funds[0]?.history) || (funds[0] ? [funds[0].nav] : [])} />
        </div>
      </div>
    </div>
  )
}
