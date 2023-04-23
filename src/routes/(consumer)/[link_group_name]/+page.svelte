<script lang="ts">
  import type { Link } from '@prisma/client';
  import '../../../app.css';
  import Background from '../../../components/consumer/Background.svelte';
  import Button from '../../../components/consumer/Button.svelte';
  import ProviderButton from '../../../components/consumer/ProviderButton.svelte';
  import type { LinkWithProviderDetails } from '../../../core/models/providers/provider.dto';
  import type { PageData } from './$types';

  export let data: PageData;

  let links: LinkWithProviderDetails[] = data.link_group?.links as LinkWithProviderDetails[];
  let linkGroup = data.link_group;

  function getButtonText(link: Link): string {
    if (link.name) return link.name;
    return link.provider as string;
  }

  const getStyles = () => {
    let style = {
      color: linkGroup?.fontColor,
    };
    return style;
  };

  $: cssVarStyles = Object.entries(getStyles())
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
</script>

{#if linkGroup && linkGroup.theme}
  <div class="h-screen w-screen">
    {#if linkGroup.theme.background}
      <Background
        backgroundType="{linkGroup.theme.background.backgroundType}"
        backgroundColor="{linkGroup.theme.background.backgroundColor}"
        gradientStops="{linkGroup.theme.background.gradientStops}"
        imageUrl="{linkGroup.theme.background.imageUrl}"
      >
        <div class="h-full w-full">
          <div class="flex flex-col align-middle items-center">
            {#if linkGroup.imageURL}
              <div class="rounded-full w-[110px] border border-3 h-[110px]">
                <img
                  class="h-full w-full object-fill rounded-full"
                  alt="link-group-header"
                  src="{linkGroup.imageURL}"
                />
              </div>
            {/if}
            {#if linkGroup.description}
              <div class="mt-3" style="{cssVarStyles}">
                {linkGroup.description}
              </div>
            {/if}
          </div>
          <div class="mt-3 flex flex-col align-middle items-center min-w-[200px]">
            {#if linkGroup.theme.button}
              {#if links}
                {#each links as l}
                  <div class="p-1 mb-2 sm:w-[520px] w-full h-full">
                    {#if l.providerDetails}
                      <ProviderButton
                        link="{l}"
                        buttonColor="{linkGroup.theme.button.buttonColor}"
                        buttonShape="{linkGroup.theme.button.buttonShape}"
                        buttonTheme="{linkGroup.theme.button.buttonTheme}"
                        outlineColor="{linkGroup.theme.button.outlineColor}"
                        fontColor="{linkGroup.theme.button.fontColor}"
                        buttonText="{getButtonText(l)}"
                      />
                    {:else}
                      <Button
                        link="{l}"
                        buttonColor="{linkGroup.theme.button.buttonColor}"
                        buttonShape="{linkGroup.theme.button.buttonShape}"
                        buttonTheme="{linkGroup.theme.button.buttonTheme}"
                        outlineColor="{linkGroup.theme.button.outlineColor}"
                        fontColor="{linkGroup.theme.button.fontColor}"
                        buttonText="{getButtonText(l)}"
                      />
                    {/if}
                  </div>
                {/each}
              {/if}
            {/if}
          </div>
        </div>
      </Background>
    {/if}
  </div>
{:else}
  <div>
    DevLinks Page with this link does not exist. Create a your own page <a href="admin/login"
      >here
    </a>
  </div>
{/if}
