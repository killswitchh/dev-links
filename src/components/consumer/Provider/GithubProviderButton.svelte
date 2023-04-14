<script lang="ts">
  import { goto } from '$app/navigation';
  import github from '$lib/images/github.svg';
  import { Provider, type ButtonShape, type ButtonTheme } from '@prisma/client';
  import type {
    GithubAccountDetails,
    GithubRepositoryDetails,
    LinkWithProviderDetails,
  } from '../../../core/models/providers/provider.dto';
  import { extractStylesFromButton } from '../../../core/utils/utils';
  import RoundBadge from '../../common/RoundBadge.svelte';
  import GithubFork from '../../common/icons/github/GithubFork.svelte';
  import GithubStar from '../../common/icons/github/GithubStar.svelte';
  import GithubWatcher from '../../common/icons/github/GithubWatcher.svelte';

  export let buttonText: string;
  export let buttonTheme: ButtonTheme;
  export let buttonShape: ButtonShape;
  export let buttonColor: string;
  export let fontColor: string;
  export let outlineColor: string;
  export let link: LinkWithProviderDetails | null = null;

  const providerDetails = link?.providerDetails;
  let githubUserDetails: GithubAccountDetails;
  let githubRepoDetails: GithubRepositoryDetails;

  if (providerDetails) {
    switch (link?.provider) {
      case Provider.GITHUB_PROFILE:
        githubUserDetails = providerDetails as GithubAccountDetails;
        break;
      case Provider.GITHUB_REPOSITORY:
        githubRepoDetails = providerDetails as GithubRepositoryDetails;
        break;
    }
  }

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

{#if githubUserDetails}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="p-3 w-full" style="{cssVarStyles}">
    <div class="flex flex-col align-middle items-center">
      <div class="flex flex-row justify-center w-full">
        <div class="h-5 w-5">
          <img src="{github}" alt="github-logo" />
        </div>
        <div class="flex items-center">Github</div>
      </div>

      <div class="flex flex-row mt-2 w-full justify-evenly">
        <div class="rounded-full w-[60px] border h-[60px]">
          <img
            class="h-full w-full object-fill rounded-full"
            alt="link-group-header"
            src="{githubUserDetails.profileImageUrl}"
          />
        </div>
        <div class="flex flex-col">
          <span class="font-bold">{githubUserDetails.name}</span>
          {#if githubUserDetails.company}
            <small class="font-light">{githubUserDetails.company}</small>
          {/if}
          <div class="flex flex-row justify-between">
            <small> Repos: {githubUserDetails.repos} </small>
            <small class="ml-2"> Followers: {githubUserDetails.followers}</small>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button
          type="button"
          on:click="{buttonClicked}"
          class="bg-slate-900 hover:bg-slate-700 text-white py-1 px-2 rounded-full"
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
{/if}
{#if githubRepoDetails}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="p-3 w-full" style="{cssVarStyles}">
    <div class="flex flex-col align-middle items-center">
      <div class="flex flex-row justify-center w-full">
        <div class="h-5 w-5"><img src="{github}" alt="github-logo" /></div>
        <div class="flex items-center">Github</div>
      </div>

      <div class="flex flex-row mt-2 w-full justify-evenly">
        <div class="rounded-full w-[60px] border h-[60px]">
          <img
            class="h-full w-full object-fill rounded-full"
            alt="link-group-header"
            src="{githubRepoDetails.profileImageUrl}"
          />
        </div>
        <div class="flex flex-col">
          <span class="font-bold">{githubRepoDetails.name}</span>
          <small class="font-light">{githubRepoDetails.language}</small>
          <div class="flex flex-row justify-between">
            <div class="flex flex-row">
              <GithubStar />
              :
              {githubRepoDetails.stars}
            </div>
            <div class="flex flex-row ml-2">
              <GithubFork />
              :
              {githubRepoDetails.forks}
            </div>
            <div class="flex flex-row ml-2">
              <GithubWatcher />
              :
              {githubRepoDetails.watchers}
            </div>
          </div>
        </div>
      </div>
      <div class="pl-3 pr-2 w-full mt-2">
        <div class="flex flex-row overflow-auto scrollbar-hide justify-center">
          {#each githubRepoDetails.topics as topic}
            <RoundBadge text="{topic}" />
          {/each}
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
