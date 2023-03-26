import type { Session } from '@supabase/supabase-js'
import { writable } from 'svelte/store'

export type Store = {
  error?: string | null
  user?: Session | null
  wizard?: WizardStep[]
}

export type WizardStep = {
  stepId: number
  title: string
  status: 'INITIATED' | 'IN-PROGRESS' | 'COMPLETE'
  value: any // Link[] | Style
}

const defaultStoreValue: Store = {
  error: null,
  wizard: [
    {
      stepId: 1,
      title: 'Links',
      status: 'INITIATED',
      value: {},
    },
    {
      stepId: 2,
      title: 'Buttons',
      status: 'INITIATED',
      value: {},
    },
    {
      stepId: 3,
      title: 'Theme',
      status: 'INITIATED',
      value: {},
    },
  ],
}

export type WizardStepStatus = 'INITIATED' | 'IN-PROGRESS' | 'COMPLETE'

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
    updateWizardStepValue: (stepId: number, value: any) =>
      update((store) => {
        store.wizard?.map((wiz) => {
          if (wiz.stepId === stepId) {
            wiz.value = value
          }
        })
        return store
      }),
    updateWizardStepStatus: (stepId: number, status: WizardStepStatus) =>
      update((store) => {
        store.wizard?.map((wiz) => {
          if (wiz.stepId === stepId) {
            wiz.status = status
          }
        })
        return store
      }),
  }
}

export const appStore = createAppStore()

export const darkTheme = writable(false)
