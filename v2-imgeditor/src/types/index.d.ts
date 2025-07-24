export type FilterType =
  | 'Brightness'
  | 'Saturation'
  | 'Inversion'
  | 'Grayscale'
  | 'Hue'
  | 'Temperature'

export type RotationType = 'left' | 'right' | 'vertical' | 'horizontal'

export interface FilterSettings {
  max: number
  defaultValue: number
}

export type FilterValues = Record<FilterType, number>

export type TransformValues = {
  rotation: number
  horizontal: number
  vertical: number
}

export type StickerType = {
  emoji: string
  x: number
  y: number
  size: number
}
