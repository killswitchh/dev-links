<script lang="ts">
  import { Provider, type Link } from '../../../core/models/link.dto';
  import LinkDisplay from './LinkDisplay.svelte';

  let links: Link[] = [
    {
      id: '1',
      url: 'killswich',
      provider: Provider.GITHUB,
      enrich: false,
      order: 1,
      prioritize: true,
    },
    {
      id: '2',
      url: 'killswich',
      provider: Provider.BITBUCKET,
      enrich: false,
      order: 2,
      prioritize: true,
    },
  ];
</script>

<div class="m-2 h-[80%] bg-slate-400 rounded-xl flex flex-col items-center">
  {#each links as link}
    <LinkDisplay link="{link}" />
  {/each}

  <div class="mt-2 w-[10%] h-[18%] bg-white rounded-full flex flex-col items-center">
    <div>+</div>
  </div>
</div>
