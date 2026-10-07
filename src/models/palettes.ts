export type PaletteColor = {
  hex: string
  name?: string
}

export type Palette = {
  id: string
  name: string
  colors: PaletteColor[]
}