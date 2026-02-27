import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleSubmit(e){
    e.preventDefault()
    // demo registration: store in localStorage
    const users = JSON.parse(localStorage.getItem('mf_users') || '[]')
    users.push({ email, password })
    localStorage.setItem('mf_users', JSON.stringify(users))
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-hero">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white/95 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <label className="block mb-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
