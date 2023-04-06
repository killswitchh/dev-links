import type { Session } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';
import type { LinkGroup } from './core/models/link-group.dto';
import type { User } from './core/models/user.dto';

export type Store = {
  error?: string | null;
  user?: Session | null;
};

export type WizardStep = {
  stepId: number;
  text: string;
  status: WizardStepStatus;
};

const defaultStoreValue: Store = {
  error: null,
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

export const linkGroupStore: Writable<LinkGroup> = writable();

export const userStore: Writable<User> = writable();

export const refreshIframe: Writable<boolean> = writable(false);

function createEditLinkToggleStore() {
  const store: Writable<Map<string, boolean>> = writable(new Map());
  return {
    subscribe: store.subscribe,
    updateToggleValue: (linkId: string | undefined, status: boolean) =>
      store.update((store) => {
        console.log('updating store value for linkID', linkId);
        if (!linkId) return store;
        store.set(linkId, status);
        return store;
      }),
  };
}

export const editLinkToggleStore = createEditLinkToggleStore();
