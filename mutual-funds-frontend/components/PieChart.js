import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ data={} }){
  const labels = Object.keys(data)
  const values = labels.map(k=>data[k])
  const colors = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6']
  return <div className="max-w-xs"><Pie data={{ labels, datasets:[{ data: values, backgroundColor: colors.slice(0, labels.length) }] }} /></div>
}
