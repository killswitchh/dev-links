// See https://kit.svelte.dev/docs/types#app

import type { User } from './core/models/user.dto';

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      getSession(): Promise<Session | null>;
      user: User | null;
    }
    interface PageData {
      session: Session | null;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
