import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export type Store = {
  error?: string | null;
  user?: Session | null;
};

export type WizardStep = {
  stepId: number;
  text: string;
  status: WizardStepStatus;
  value: any; // Link[] | Style
};

const defaultStoreValue: Store = {
  error: null,
};

const defaultWizardStoreValue: { steps: WizardStep[] } = {
  steps: [
    {
      stepId: 1,
      text: 'Links',
      status: 'COMPLETE',
      value: {},
    },
    {
      stepId: 2,
      text: 'Buttons',
      status: 'IN_PROGRESS',
      value: {},
    },
    {
      stepId: 3,
      text: 'Theme',
      status: 'NOT_STARTED',
      value: {},
    },
  ],
};

export type WizardStepStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';

function createAppStore() {
  const { subscribe, update } = writable(defaultStoreValue);

  return {
    subscribe,
    updateError: (error: string | null) =>
      update((store) => {
        store.error = error;
        return store;
      }),
    updateCurrentSession: (user: Session | null) =>
      update((store) => {
        store.user = user;
        return store;
      }),
  };
}

function createWizardStore() {
  const { subscribe, update } = writable(defaultWizardStoreValue);

  return {
    subscribe,
    updateWizardStepValue: (stepId: number, value: any) =>
      update((store) => {
        store.steps?.map((wiz) => {
          if (wiz.stepId === stepId) {
            wiz.value = value;
          }
        });
        return store;
      }),
    updateWizardStepStatus: (stepId: number, status: WizardStepStatus) =>
      update((store) => {
        store.steps?.map((wiz) => {
          if (wiz.stepId === stepId) {
            wiz.status = status;
          }
        });
        return store;
      }),
  };
}

export const appStore = createAppStore();

export const darkTheme = writable(false);

export const wizardStore = createWizardStore();
