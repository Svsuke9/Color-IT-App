import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Palette } from '../models/palette'

/**
 * List all palettes for a specific user
 * @param userId - The user's ID
 * @returns Promise<Palette[]> - Array of user's palettes
 */
export const listPalettesForUser = async (userId: string): Promise<Palette[]> => {
  try {
    const q = query(
      collection(db, 'palettes'),
      where('ownerId', '==', userId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Palette[]
  } catch (error) {
    console.error('Error fetching palettes:', error)
    throw error
  }
}

/**
 * Create a new palette
 * @param palette - Palette data (without id and createdAt)
 * @returns Promise<string> - The new palette's ID
 */
export const createPalette = async (
  palette: Omit<Palette, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'palettes'), {
      ...palette,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating palette:', error)
    throw error
  }
}

/**
 * Update an existing palette
 * @param paletteId - The palette's ID
 * @param updates - Fields to update
 * @returns Promise<void>
 */
export const updatePalette = async (
  paletteId: string,
  updates: Partial<Palette>
): Promise<void> => {
  try {
    const paletteRef = doc(db, 'palettes', paletteId)
    await updateDoc(paletteRef, updates)
  } catch (error) {
    console.error('Error updating palette:', error)
    throw error
  }
}

/**
 * Delete a palette
 * @param paletteId - The palette's ID
 * @returns Promise<void>
 */
export const deletePalette = async (paletteId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'palettes', paletteId))
  } catch (error) {
    console.error('Error deleting palette:', error)
    throw error
  }
}
