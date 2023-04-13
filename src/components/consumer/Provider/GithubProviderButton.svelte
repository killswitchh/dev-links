<script lang="ts">
  import { goto } from '$app/navigation';
  import github from '$lib/images/github.svg';
  import { ButtonShape, ButtonTheme } from '@prisma/client';
  import type { LinkWithProviderDetails } from '../../../core/models/providers/provider.dto';

  export let buttonText: string;
  export let buttonTheme: ButtonTheme;
  export let buttonShape: ButtonShape;
  export let buttonColor: string;
  export let fontColor: string;
  export let outlineColor: string;
  export let link: LinkWithProviderDetails | null = null;

  const providerDetails = link?.providerDetails;

  function buttonClicked() {
    if (link) {
      goto(link.url);
    }
  }

  const getStyles = (
    buttonTheme: ButtonTheme,
    buttonShape: ButtonShape,
    buttonColor: string,
    fontColor: string,
    outlineColor: string,
  ) => {
    let border_radius;
    switch (buttonShape) {
      case ButtonShape.PILL:
        border_radius = '35px';
        break;
      case ButtonShape.RECTANGLE:
        border_radius = '0px';
        break;
      case ButtonShape.ROUNDED_RECTANGLE:
        border_radius = '12px';
        break;
    }

    const style = {
      'background-color':
        buttonTheme === ButtonTheme.FILL || buttonTheme === ButtonTheme.SHADOW
          ? buttonColor
          : 'transparent',
      color: fontColor,
      'border-radius': border_radius,
      border: buttonTheme === ButtonTheme.OUTLINE ? `1px solid ${outlineColor}` : 'none',
      'box-shadow': buttonTheme === ButtonTheme.SHADOW ? '5px 10px 8px #888888' : '',
    };

    return style;
  };

  $: cssVarStyles = Object.entries(
    getStyles(buttonTheme, buttonShape, buttonColor, fontColor, outlineColor),
  )
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
</script>

{#if providerDetails}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="p-3 w-full" style="{cssVarStyles}">
    <div class="flex flex-col align-middle items-center">
      <div class="flex flex-row justify-center w-full">
        <div class="h-8 w-8">
          <img src="{github}" alt="github-logo" />
        </div>
        <div class="flex items-center">Github</div>
      </div>

      <div class="flex flex-row mt-2 w-full justify-evenly">
        <div class="rounded-full w-[60px] border h-[60px]">
          <img
            class="h-full w-full object-fill rounded-full"
            alt="link-group-header"
            src="{providerDetails.profileImageUrl}"
          />
        </div>
        <div class="flex flex-col">
          <span class="font-bold">{providerDetails.name}</span>
          <small class="font-light">{providerDetails.company}</small>
          <div class="flex flex-row justify-between">
            <small> Repos: {providerDetails.repos} </small>
            <small class="ml-2"> Followers: {providerDetails.followers}</small>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button
          type="button"
          on:click="{buttonClicked}"
          class="bg-slate-900 hover:bg-slate-700 text-white py-1 px-2 rounded-full"
        >
          Visit Profile
        </button>
      </div>
    </div>
  </div>
{/if}
