<script lang="ts">
  import { ButtonShape, ButtonTheme, Provider } from '@prisma/client';
  import type { LinkWithProviderDetails } from '../../core/models/providers/provider.dto';
  import GithubProviderButton from './Provider/GithubProviderButton.svelte';

  export let buttonText: string;
  export let buttonTheme: ButtonTheme;
  export let buttonShape: ButtonShape;
  export let buttonColor: string;
  export let fontColor: string;
  export let outlineColor: string;
  export let link: LinkWithProviderDetails | null = null;
</script>

{#if link}
  {#if link.provider === Provider.GITHUB_PROFILE || link.provider === Provider.GITHUB_REPOSITORY}
    <GithubProviderButton
      link="{link}"
      buttonColor="{buttonColor}"
      buttonShape="{buttonShape}"
      buttonTheme="{buttonTheme}"
      outlineColor="{outlineColor}"
      fontColor="{fontColor}"
      buttonText="{buttonText}"
    />
  {/if}
{/if}
