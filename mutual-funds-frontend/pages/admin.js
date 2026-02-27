import { useEffect, useState } from 'react'
import FundCard from '../components/FundCard'

export default function Admin(){
  const [funds, setFunds] = useState([])
  const [newName, setNewName] = useState('')
  const [newNAV, setNewNAV] = useState('')

  useEffect(()=>{
    fetch('/api/funds').then(r=>r.json()).then(setFunds)
    const es = new EventSource('/api/realtime')
    es.onmessage = evt => {
      try {
        const update = JSON.parse(evt.data)
        setFunds(prev => prev.map(f=> f.id===update.id ? {...f, nav:update.nav, change:update.change, history: [...(f.history||[]).slice(-4), update.nav]} : f))
      } catch(e){}
    }
    return ()=> es.close()
  }, [])

  const addFund = e => {
    e.preventDefault()
    if(!newName || !newNAV) return
    setFunds(prev => [...prev, { id: prev.length+1, name: newName, nav: parseFloat(newNAV), risk: 'Unknown', history: [parseFloat(newNAV)] }])
    setNewName(''); setNewNAV('')
  }

  const totalNAV = funds.reduce((s,f)=>s+ (f.nav||0),0).toFixed(2)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin / Analyst Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage system data and view metrics. Data below is for demo purposes only.</p>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm uppercase text-gray-500">Total NAV in system</div>
          <div className="text-xl font-semibold">${totalNAV}</div>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={addFund} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Fund name"
            value={newName}
            onChange={e=>setNewName(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Initial NAV"
            value={newNAV}
            onChange={e=>setNewNAV(e.target.value)}
            className="border px-3 py-2 rounded w-32"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded">Add Fund</button>
        </form>
        <p className="text-sm text-gray-500 mt-1">(new funds are only stored client-side in this demo)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {funds.map(f=> <FundCard key={f.id} fund={f} />)}
      </div>
    </div>
  )
}
