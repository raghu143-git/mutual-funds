import { useEffect, useState } from 'react'
import FundCard from '../components/FundCard'
import Chart from '../components/Chart'

export default function Advisor(){
  const [funds, setFunds] = useState([])

  useEffect(()=>{
    // initial list
    fetch('/api/funds').then(r=>r.json()).then(setFunds)

    // realtime NAV updates via SSE
    const es = new EventSource('/api/realtime')
    es.onmessage = evt => {
      try {
        const update = JSON.parse(evt.data)
        setFunds(prev => prev.map(f=> f.id===update.id ? {...f, nav:update.nav, change:update.change, history: [...(f.history||[]).slice(-4), update.nav]} : f))
      } catch(e){}
    }
    return ()=> es.close()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Advisor Dashboard</h1>
      <p className="text-gray-600 mb-6">Here you can review fund performance and create recommendations for clients.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {funds.map(f=> (
          <div key={f.id}>
            <FundCard fund={f} />
            <div className="mt-3 bg-white p-3 rounded shadow">
              <Chart history={f.history || [f.nav]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
