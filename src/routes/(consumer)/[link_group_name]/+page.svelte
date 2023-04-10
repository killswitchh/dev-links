<script lang="ts">
  import '../../../app.css';
  import Background from '../../../components/consumer/Background.svelte';
  import Button from '../../../components/consumer/Button.svelte';
  import type { LinkGroup } from '../../../core/models/link-group.dto';
  import type { Link } from '../../../core/models/link.dto';
  import type { PageData } from './$types';

  export let data: PageData;

  let links: Link[] = data.link_group?.links as Link[];
  let linkGroup: LinkGroup = data.link_group as LinkGroup;

  function getButtonText(link: Link): string {
    if (link.name) return link.name;
    return link.provider as string;
  }
</script>

{#if linkGroup}
  <div class="h-screen w-screen">
    <Background
      backgroundType="{linkGroup.theme.background.backgroundType}"
      backgroundColor="{linkGroup.theme.background.backgroundColor}"
      gradientStops="{linkGroup.theme.background.gradientStops}"
      imageUrl="{linkGroup.theme.background.imageUrl}"
    >
      <div class="h-full w-full">
        <div class="flex flex-col align-middle items-center">
          {#if linkGroup.imageURL}
            <div class="rounded-full w-[90px] border h-[90px]">
              <img
                class="h-full w-full object-fill rounded-full"
                alt="link-group-header"
                src="{linkGroup.imageURL}"
              />
            </div>
          {/if}
          {#if linkGroup.description}
            <div class="mt-3">
              {linkGroup.description}
            </div>
          {/if}
        </div>
        <div class="mt-3 flex flex-col align-middle items-center min-w-[200px]">
          {#if links}
            {#each links as l}
              <div class="p-1 mb-2 w-full h-full">
                <Button
                  link="{l}"
                  buttonColor="{linkGroup.theme.button.buttonColor}"
                  buttonShape="{linkGroup.theme.button.buttonShape}"
                  buttonTheme="{linkGroup.theme.button.buttonTheme}"
                  outlineColor="{linkGroup.theme.button.outlineColor}"
                  fontColor="{linkGroup.theme.button.fontColor}"
                  buttonText="{getButtonText(l)}"
                />
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </Background>
  </div>
{:else}
  <div>
    DevLinks Page with this link does not exist. Create a your own page <a href="admin/login"
      >here
    </a>
  </div>
{/if}
