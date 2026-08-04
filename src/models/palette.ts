import type { Timestamp } from 'firebase/firestore'

/**
 * Represents a color in a palette
 */
export interface Color {
  hex: string
  name?: string
}

/**
 * Represents a palette document in Firestore
 */
export interface Palette {
  id: string
  name: string
  description?: string
  colors: Color[]
  ownerId: string
  isPublic: boolean
  createdAt: Timestamp | Date
  updatedAt?: Timestamp | Date
}
