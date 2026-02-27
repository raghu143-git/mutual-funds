// Simple SSE endpoint that emits periodic NAV updates for demo purposes.
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flush?.()

  const funds = [
    { id: 1, nav: 125.34 },
    { id: 2, nav: 98.12 },
    { id: 3, nav: 210.45 }
  ]

  const iv = setInterval(() => {
    // pick a random fund and change its NAV slightly
    const idx = Math.floor(Math.random() * funds.length)
    const change = (Math.random() - 0.5) * 0.5
    funds[idx].nav = +(funds[idx].nav + change).toFixed(2)
    const payload = { id: funds[idx].id, nav: funds[idx].nav, change: change.toFixed(3) }
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }, 2000)

  req.on('close', () => {
    clearInterval(iv)
  })
}
