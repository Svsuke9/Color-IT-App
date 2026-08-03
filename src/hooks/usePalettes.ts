import { useEffect, useState } from 'react'
import type { Palette } from '../models/palette'
import { listPalettesForUser } from '../services/paletteService'

export function usePalettes(userId?: string) {
  const [palettes, setPalettes] = useState<Palette[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setPalettes([])
      setLoading(false)
      return
    }
    let mounted = true
    ;(async () => {
      try {
        const list = await listPalettesForUser(userId)
        if (mounted) setPalettes(list)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [userId])

  return { palettes, loading }
}
