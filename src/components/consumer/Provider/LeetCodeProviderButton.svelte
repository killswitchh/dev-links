<script lang="ts">
  import { goto } from '$app/navigation';
  import leetcode from '$lib/images/leetcode.svg';
  import type { ButtonShape, ButtonTheme } from '@prisma/client';
  import type {
    LeetcodeProfileDetails,
    LinkWithProviderDetails,
  } from '../../../core/models/providers/provider.dto';
  import { extractStylesFromButton } from '../../../core/utils/utils';

  export let buttonText: string;
  export let buttonTheme: ButtonTheme;
  export let buttonShape: ButtonShape;
  export let buttonColor: string;
  export let fontColor: string;
  export let outlineColor: string;
  export let link: LinkWithProviderDetails | null = null;

  const providerDetails = link?.providerDetails;
  let leetCodeDetails: LeetcodeProfileDetails = providerDetails as LeetcodeProfileDetails;

  function buttonClicked() {
    if (link) {
      goto(link.url);
    }
  }

  $: cssVarStyles = Object.entries(
    extractStylesFromButton(buttonTheme, buttonShape, buttonColor, fontColor, outlineColor),
  )
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
</script>

{#if leetCodeDetails}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="p-3 w-full" style="{cssVarStyles}">
    <div class="flex flex-col align-middle items-center">
      <div class="flex flex-row justify-center w-full">
        <div class="h-5 w-5">
          <img src="{leetcode}" alt="leetcode-logo" />
        </div>
        <div class="flex items-center">Leetcode</div>
      </div>

      <div class="flex flex-row mt-2 w-full justify-start sm:pl-[25%] pl-[4%]">
        <div class="rounded-full w-[60px] border h-[60px] mr-8">
          <a href="{link?.url}">
            <img
              class="h-full w-full object-fill rounded-full"
              alt="link-group-header"
              src="{leetCodeDetails.profileImage}"
            />
          </a>
        </div>
        <div class="flex flex-col">
          <span class="font-bold">{leetCodeDetails.name} </span>
          <div class="flex flex-row justify-between">
            <small> Easy: {leetCodeDetails.problems.easy} </small>
            <small class="ml-2"> Medium: {leetCodeDetails.problems.medium}</small>
            <small class="ml-2"> Hard: {leetCodeDetails.problems.hard}</small>
          </div>
          <small>
            Rank: {leetCodeDetails.ranking}
          </small>
        </div>
      </div>
      <div class="mt-2 w-full flex flex-row justify-center">
        <button
          type="button"
          on:click="{buttonClicked}"
          class="bg-slate-900 hover:bg-slate-700 text-white py-1 px-2 rounded-full min-w-[40%]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
{/if}
