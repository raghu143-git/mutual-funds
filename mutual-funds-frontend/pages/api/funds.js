export default function handler(req, res) {
  const funds = [
    { id: 1, name: 'Global Equity Fund', nav: 125.34, risk: 'High', history: [120,121,123,122,125] },
    { id: 2, name: 'Income Bond Fund', nav: 98.12, risk: 'Medium', history: [97,97.5,98,98.2,98.12] },
    { id: 3, name: 'Balanced Growth Fund', nav: 210.45, risk: 'Medium-High', history: [200,205,207,209,210] }
  ]
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(funds)
}
