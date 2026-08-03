// src/components/AuthForm.tsx
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin'|'signup'>('signin')
  const [error, setError] = useState<string|null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>{mode === 'signup' ? 'S’inscrire' : 'Se connecter'}</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <button type="submit">{mode === 'signup' ? 'S’inscrire' : 'Se connecter'}</button>
        <button type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
          {mode === 'signup' ? 'J’ai déjà un compte' : 'Créer un compte'}
        </button>
      </div>
    </form>
  )
}
