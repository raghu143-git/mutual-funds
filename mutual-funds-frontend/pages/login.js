import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('investor')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // demo password check
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    if (password !== 'password123') {
      setError('Incorrect password')
      return
    }
    const user = { email, role }
    localStorage.setItem('mf_user', JSON.stringify(user))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-hero">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white/95 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <label className="block mb-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="you@domain.com" />
        <label className="block mb-2">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="••••••••" />
        <label className="block mb-2">Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded mb-4">
          <option value="investor">Investor</option>
          <option value="advisor">Financial Advisor</option>
          <option value="admin">Admin</option>
          <option value="analyst">Data Analyst</option>
        </select>
        <button className="w-full py-2 bg-blue-600 text-white rounded mb-3">Continue</button>
        <div className="flex justify-between text-sm">
          <Link href="/forgot" className="text-blue-600">Forgot password?</Link>
          <Link href="/register" className="text-blue-600">Register</Link>
        </div>
      </form>
    </div>
  )
}
