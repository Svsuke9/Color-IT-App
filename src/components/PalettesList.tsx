import React from 'react'
import PaletteCard from './PaletteCard'
import type { Palette } from '../models/palette'

export default function PalettesList({ palettes }: { palettes: Palette[] }) {
  if (!palettes || palettes.length === 0) return <div>Aucune palette pour le moment.</div>
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:12}}>
      {palettes.map(p => (
        <PaletteCard key={p.id} palette={p} />
      ))}
    </div>
  )
}
