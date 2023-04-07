<script lang="ts">
  import { onMount } from 'svelte';
  import '../../app.css';
  import { routes } from '../../routes';

  import Header from '../Header.svelte';
  import '../styles.css';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  onMount(() => {
    console.log('SESSION FOUND', !!$page.data.session);
    if ($page.data.session) {
      goto('/admin/profile');
    }
  });
</script>

<div>
  <Header nav_bar="{routes}" />
  <slot />
</div>
