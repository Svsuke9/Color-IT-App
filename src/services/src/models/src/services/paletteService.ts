// src/services/paletteService.ts
import { db } from './firebase'
import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'
import type { Palette } from '../models/palette'

const palettesCol = collection(db, 'palettes')

export async function createPalette(p: Omit<Palette,'id'|'createdAt'>) {
  const payload = { ...p, createdAt: Timestamp.now() }
  const ref = await addDoc(palettesCol, payload)
  return { id: ref.id, ...payload } as Palette
}

export async function updatePalette(id: string, data: Partial<Palette>) {
  const ref = doc(db, 'palettes', id)
  await setDoc(ref, data, { merge: true })
}

export async function deletePalette(id: string) {
  await deleteDoc(doc(db, 'palettes', id))
}

export async function listPalettesForUser(userId: string) {
  const q = query(palettesCol, where('ownerId','==', userId), orderBy('createdAt','desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Palette[]
}
