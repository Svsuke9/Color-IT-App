// src/components/PaletteCard.tsx
import React from 'react'
import type { Palette } from '../models/palette'

export default function PaletteCard({ palette }: { palette: Palette }) {
  return (
    <div style={{border:'1px solid #eee', padding:12, borderRadius:6, maxWidth:320}}>
      <h4>{palette.name}</h4>
      <div style={{display:'flex', gap:8}}>
        {palette.colors.map((c,i) => (
          <div key={i} style={{width:48, height:48, background:c.hex, borderRadius:4}} title={c.hex}></div>
        ))}
      </div>
    </div>
  )
}
