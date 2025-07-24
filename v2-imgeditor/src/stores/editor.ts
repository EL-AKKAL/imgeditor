import type { FilterType, RotationType, StickerType } from '@/types'
import { defineStore } from 'pinia'

export const useImageEditorStore = defineStore('imageEditor', {
  state: () => ({
    activeFilter: 'Brightness' as FilterType,
    filterValue: 100,
    filterMax: 200,
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
    rotation: 0,
    horizontal: 1,
    vertical: 1,
    editedImage: null as string | null,
    fileName: '',
    fileType: '',
    imageLoaded: false,
    hue: 0,
    temperature: 0,
    stickers: [] as StickerType[],
  }),
  actions: {
    resetFilters() {
      this.brightness = 100
      this.saturation = 100
      this.hue = 0
      this.temperature = 0
      this.inversion = 0
      this.grayscale = 0
      this.rotation = 0
      this.horizontal = 1
      this.vertical = 1
      this.filterValue = 100
      this.filterMax = 200

      this.activeFilter = 'Brightness'
    },
    async loadImage(file: File) {
      return new Promise((resolve) => {
        try {
          const reader = new FileReader()

          reader.onload = (e) => {
            if (!e.target?.result) throw new Error('Failed to read file')

            this.editedImage = e.target?.result as string
            this.fileName = file.name.replace(/\.[^/.]+$/, '')
            this.fileType = file.type
            this.imageLoaded = true
            resolve(true)
          }
          reader.onerror = () => {
            throw new Error('FileReader error')
          }

          reader.readAsDataURL(file)
        } catch (error) {
          console.error('Error loading image:', error)
        }
      })
    },
    selectFilter(filter: FilterType) {
      this.activeFilter = filter

      switch (filter) {
        case 'Brightness':
          this.updateFilterValue(this.brightness, 200)
          break
        case 'Saturation':
          this.updateFilterValue(this.saturation, 200)
          break
        case 'Inversion':
          this.updateFilterValue(this.inversion, 100)
          this.filterMax = 100
          this.filterValue = this.inversion
          break
        case 'Grayscale':
          this.updateFilterValue(this.grayscale, 100)
          break
        case 'Hue':
          this.updateFilterValue(this.hue, 180)
          break
        case 'Temperature':
          this.updateFilterValue(this.temperature, 180)
          break
      }
    },
    updateFilter() {
      switch (this.activeFilter) {
        case 'Brightness':
          this.brightness = this.filterValue
          break
        case 'Saturation':
          this.saturation = this.filterValue
          break
        case 'Inversion':
          this.inversion = this.filterValue
          break
        case 'Grayscale':
          this.grayscale = this.filterValue
          break
        case 'Hue':
          this.hue = this.filterValue
          break
        case 'Temperature':
          this.temperature = this.filterValue
          break
      }
    },
    rotate(action: RotationType) {
      switch (action) {
        case 'left':
          this.rotation -= 90
          break
        case 'right':
          this.rotation += 90
          break
        case 'vertical':
          this.vertical = this.vertical === 1 ? -1 : 1
          break
        case 'horizontal':
          this.horizontal = this.horizontal === 1 ? -1 : 1
          break
      }
    },
    getFilters() {
      return `brightness(${this.brightness}%) saturate(${this.saturation}%) invert(${this.inversion}%) grayscale(${this.grayscale}%)  hue-rotate(${this.hue}deg)  sepia(${this.temperature > 0 ? this.temperature : 0}%)`
    },
    getTransform() {
      return `rotate(${this.rotation}deg) scale(${this.horizontal}, ${this.vertical})`
    },
    updateFilterValue(value: number, max: number) {
      this.filterMax = max
      this.filterValue = value
    },
    addSticker(emoji: string) {
      this.stickers.push({ emoji, x: 50, y: 50, size: 100 })
    },
    saveImage() {
      if (!this.editedImage) return
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      this.redrawCanvas(canvas, ctx)
      const link = document.createElement('a')
      link.download = `${this.fileName || 'image'}.jpg`
      link.href = canvas.toDataURL(this.fileType || 'image/jpeg')
      link.click()
    },

    redrawCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      if (!this.editedImage) return
      const img = new Image()
      img.src = this.editedImage

      img.onload = () => {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.filter = this.getFilters()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        if (this.rotation !== 0) ctx.rotate((this.rotation * Math.PI) / 180)
        ctx.scale(this.horizontal, this.vertical)
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
        ctx.restore()

        this.stickers.forEach((s) => {
          if (s.emoji) {
            ctx.font = `${s.size}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(s.emoji, s.x, s.y)
          }
        })
      }
    },
  },
})
