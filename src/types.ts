import type { Page } from './core/models/page.dto'

export type Route = {
  name: string
  path: string
  id: number
  active: boolean
  position: 'left' | 'right'
}

export type NullSafePageItem = Page | null
