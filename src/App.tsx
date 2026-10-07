import React, { useState } from 'react'
import AuthForm from './components/AuthForm'
import PalettesList from './components/PalettesList'
import type { Palette } from './models/palette'
const demoPalettes: Palette[] = [
  {
    id: '1',
    name: 'Sunset',
    colors: [
      { hex: '#FF6B6B', name: 'Coral' },
      { hex: '#FF9F43', name: 'Orange' },
      { hex: '#FECA57', name: 'Yellow' },
      { hex: '#54A0FF', name: 'Blue' },
      { hex: '#5F27CD', name: 'Purple' },
    ],
  },
  {
    id: '2',
    name: 'Ocean',
    colors: [
      { hex: '#023E8A', name: 'Deep Blue' },
      { hex: '#0077B6', name: 'Ocean' },
      { hex: '#00B4D8', name: 'Cyan' },
      { hex: '#90E0EF', name: 'Sky' },
      { hex: '#CAF0F8', name: 'Light' },
    ],
  },
]
export default function App() {
  const [showAuth, setShowAuth] = useState(false)
  return (
    <main style={{
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      background: '#f8f9fa',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}>
          <div>
            <h1 style={{ margin: 0 }}>Color-IT</h1>
            <p style={{ color: '#666' }}>
              Crée, découvre et partage tes palettes de couleurs.
            </p>
          </div>
          <button
            onClick={() => setShowAuth(!showAuth)}
            style={{
              padding: '10px 18px',
              border: 0,
              borderRadius: 8,
              background: '#111',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {showAuth ? 'Fermer' : 'Connexion'}
          </button>
        </header>
        {showAuth && (
          <section style={{
            marginBottom: 40,
            padding: 24,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <AuthForm />
          </section>
        )}
        <section>
          <h2>Palettes</h2>
          <PalettesList palettes={demoPalettes} />
        </section>
      </div>
    </main>
  )
}
