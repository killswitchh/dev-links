<script lang="ts">
  import logo from '$lib/images/logo.png';
  import type { Session } from '@supabase/supabase-js';
  import DarkThemeToggle from '../../components/dark-theme-toggle/DarkThemeToggle.svelte';
  import { routes, routesLoggedIn } from '../../routes';
  import { appStore } from '../../stores';
  import type { Route } from '../../types';
  let nav_bar: Route[] = [];

  function updateActiveNavBarElement(route: Route) {
    nav_bar.map((x) => (x.active = x.id === route.id));
    nav_bar = nav_bar;
  }
  let user: Session | undefined | null;

  appStore.subscribe((store) => {
    user = store.user;
    if (user) {
      nav_bar = routesLoggedIn;
    } else {
      nav_bar = routes;
    }
    return store;
  });
</script>

<header>
  <navbar class="navbar">
    <ul>
      <li>
        <img class="h-[35px] p-[5px]" src="{logo}" alt="Not Found" />
      </li>
      {#each nav_bar as route}
        <li class="{route.active ? 'active' : ''} {route.position === 'right' ? 'right' : ''}">
          <a href="{route.path}" on:click="{() => updateActiveNavBarElement(route)}">{route.name}</a
          >
        </li>
      {/each}
      <li class="right">
        <DarkThemeToggle />
      </li>
    </ul>
  </navbar>
</header>

<style>
  .right {
    right: 0;
    float: right !important;
  }
  .navbar {
    position: fixed;
    width: 96%;
    margin-left: 2%;
    margin-top: 1%;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    z-index: 9999;
  }

  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .navbar li {
    float: left;
  }

  .navbar li a {
    display: block;
    color: #000000;
    text-align: center;
    padding: 16px;
    text-decoration: none;
  }

  .navbar li a:hover {
    background-color: #f2f2f2;
  }

  .active {
    background-color: #4caf50;
    color: white;
    border-radius: 10px;
  }
</style>
