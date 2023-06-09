<script lang="ts">
  import logo from '$lib/images/logo.png';
  import { BackgroundType, type GradientStop } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';
  import type { BackgroundChangeEvent } from '../../core/models/theme.dto';

  export let backgroundType: BackgroundType;
  export let backgroundColor: string | null | undefined;
  export let gradientStops: GradientStop[] | undefined | null;
  export let imageUrl: string | null | undefined;
  export let displayBackgroundType = false;

  const dispatch = createEventDispatcher<BackgroundChangeEvent>();

  function backgroundClicked() {
    dispatch('selected', {
      backgroundType,
      backgroundColor,
      gradientStops,
      imageUrl,
    });
  }

  const getStyles = (
    backgroundType: BackgroundType,
    backgroundColor: string | null | undefined,
    gradientStops: GradientStop[] | undefined | null,
    imageUrl: string | null | undefined,
  ) => {
    let style = {
      'background-color': 'transparent',
      'background-image': 'none',
      'background-size': '100%',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      background: '',
    };
    switch (backgroundType) {
      case BackgroundType.FILL:
        style['background-image'] = 'none';
        style['background-color'] = backgroundColor
          ? `${backgroundColor} !important`
          : 'transparent';

        break;
      case BackgroundType.GRADIENT:
        style['background-image'] = 'none';
        style['background-color'] = 'transparent';
        style['background'] = getGradientBg(gradientStops);
        break;
      case BackgroundType.IMAGE:
        style['background-image'] = `url(${logo})`;
        style['background-color'] = 'transparent';
        break;
    }

    return style;
  };

  $: cssVarStyles = Object.entries(
    getStyles(backgroundType, backgroundColor, gradientStops, imageUrl),
  )
    .map(([key, value]) => `${key}:${value}`)
    .join(';');

  function getGradientBg(gradientStops: GradientStop[] | undefined | null): string {
    if (!gradientStops) return '';
    return `linear-gradient(${gradientStops[0].color}, ${gradientStops[1].color})`;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  style="{cssVarStyles}"
  on:click="{() => backgroundClicked()}"
  class="flex flex-col items-center h-full w-full p-3 overflow-auto"
>
  {#if displayBackgroundType}
    <div class="mt-2 flex flex-col items-center">{backgroundType}</div>
  {/if}
  <slot />
</div>
