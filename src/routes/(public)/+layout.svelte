<script lang="ts">
  import '../../app.css';
  import { routes } from '../../routes';

  import Header from '../Header.svelte';
  import '../styles.css';
</script>

<div>
  <Header nav_bar="{routes}" />
  <slot />
</div>
