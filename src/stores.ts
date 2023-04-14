import type { LinkGroup } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export type Store = {
  error?: string | null;
  user?: Session | null;
};

export type WizardStep = {
  stepId: number;
  text: string;
  status: WizardStepStatus;
};

const defaultWizardStoreValue: { steps: WizardStep[] } = {
  steps: [
    {
      stepId: 1,
      text: 'Overview',
      status: 'COMPLETE',
    },
    {
      stepId: 2,
      text: 'Links',
      status: 'IN_PROGRESS',
    },
    {
      stepId: 3,
      text: 'Styling',
      status: 'NOT_STARTED',
    },
  ],
};

export type WizardStepStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';

function createWizardStore() {
  const { subscribe, update } = writable(defaultWizardStoreValue);

  return {
    subscribe,
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

export const darkTheme = writable(false);

export const wizardStore = createWizardStore();

export const linkGroupStore: Writable<LinkGroup> = writable();

export const refreshIframe: Writable<boolean> = writable(false);

function createEditLinkToggleStore() {
  const store: Writable<Map<string, boolean>> = writable(new Map());
  return {
    subscribe: store.subscribe,
    updateToggleValue: (linkId: string | undefined, status: boolean) =>
      store.update((store) => {
        if (!linkId) return store;
        store.set(linkId, status);
        return store;
      }),
  };
}

function createLoadingStore() {
  const store: Writable<Map<string, boolean>> = writable(new Map());
  return {
    subscribe: store.subscribe,
    updateLoadingForId: (id: string, status: boolean) =>
      store.update((store) => {
        store.set(id, status);
        return store;
      }),
  };
}

export const loading = createLoadingStore();

export const editLinkToggleStore = createEditLinkToggleStore();
