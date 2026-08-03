// src/models/palette.ts
export type Color = { hex: string }
export type Palette = {
  id?: string
  ownerId: string
  name: string
  colors: Color[]
  createdAt?: any
}
