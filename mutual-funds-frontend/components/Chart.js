import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Chart({ history = [] }){
  const labels = history.map((_, i) => `T-${history.length - i}`)
  const dataSet = history
  const start = dataSet[0] ?? 0
  const end = dataSet[dataSet.length - 1] ?? 0
  const positive = end >= start
  const data = {
    labels,
    datasets: [{
      label: 'NAV',
      data: dataSet,
      borderColor: positive ? 'rgba(16,185,129,1)' : 'rgba(239,68,68,1)',
      backgroundColor: positive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
      fill: true,
      tension: 0.2,
      pointRadius: 2
    }]
  }

  const opts = { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } } } }

  return <Line data={data} options={opts} />
}
