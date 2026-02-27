import { useState } from 'react'

export default function Forgot(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    // demo: pretend to send email
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-hero">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white/95 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        {sent ? <div className="text-green-600">If this email exists we'll send reset instructions.</div> : (
          <>
            <label className="block mb-2">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <button className="w-full py-2 bg-blue-600 text-white rounded">Send reset link</button>
          </>
        )}
      </form>
    </div>
  )
}
