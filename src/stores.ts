import type { Session } from '@supabase/supabase-js'
import { writable } from 'svelte/store'

export type Store = {
  error?: string | null
  user?: Session | null
}

const defaultStoreValue: Store = {
  error: null,
}
function createAppStore() {
  const { subscribe, update } = writable(defaultStoreValue)

  return {
    subscribe,
    updateError: (error: string | null) =>
      update((store) => {
        store.error = error
        return store
      }),
    updateCurrentSession: (user: Session | null) =>
      update((store) => {
        store.user = user
        return store
      }),
  }
}

export const appStore = createAppStore()

export const darkTheme = writable(false)
