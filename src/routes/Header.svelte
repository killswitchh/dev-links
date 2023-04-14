<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$lib/images/logo.png';
  import DarkThemeToggle from '../components/dark-theme-toggle/DarkThemeToggle.svelte';
  import type { Route } from '../types';

  export let nav_bar: Route[];

  function updateActiveNavBarElement(route: Route) {
    nav_bar.map((x) => (x.active = x.id === route.id));
    nav_bar = nav_bar;
  }

  const currentUrl = $page.url.pathname;
  const currentRoute = nav_bar.find((x) => x.path === currentUrl);
  if (currentRoute) {
    console.log('updating to', currentRoute);
    updateActiveNavBarElement(currentRoute);
  }
</script>

<header>
  <navbar
    class="fixed w-[96%] ml-[2%] mt-[1%] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white shadow-md rounded-full z-10"
  >
    <ul class="list-none m-0 p-0 overflow-hidden">
      <li class="float-left">
        <img class="h-[35px] p-[5px]" src="{logo}" alt="Not Found" />
      </li>
      {#each nav_bar as route}
        <li
          class="{route.active ? 'bg-pink-600 text-white rounded-full' : ''} {route.position ===
          'right'
            ? 'float-right right-0'
            : 'float-left'}"
        >
          <a
            class="block text-center p-[16px] no-underline hover:bg-slate-400 hover:rounded-full"
            href="{route.path}"
            on:click="{() => updateActiveNavBarElement(route)}">{route.name}</a
          >
        </li>
      {/each}
      <li class="float-right right-0">
        <DarkThemeToggle />
      </li>
    </ul>
  </navbar>
</header>

<style>
</style>
