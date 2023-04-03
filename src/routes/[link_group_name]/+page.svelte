<script lang="ts">
  import logo from '$lib/images/logo.png';
  import '../../app.css';
  import Button from '../../components/consumer/Button.svelte';
  import type { LinkGroup } from '../../core/models/link-group.dto';
  import type { Link } from '../../core/models/link.dto';
  import { BackgroundType, type GradientStop } from '../../core/models/theme.dto';
  import type { PageData } from './$types';

  export let data: PageData;

  let links: Link[] = data.link_group?.links as Link[];
  let linkGroup: LinkGroup = data.link_group as LinkGroup;

  function getProvider(link: Link): string {
    return link.provider as string;
  }

  const getStyles = (
    backgroundType: BackgroundType,
    backgroundColor: string | null | undefined,
    gradientStops: GradientStop[] | undefined,
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
    getStyles(
      linkGroup.theme.background.backgroundType,
      linkGroup.theme.background.backgroundColor,
      linkGroup.theme.background.gradientStops,
      linkGroup.theme.background.imageUrl,
    ),
  )
    .map(([key, value]) => `${key}:${value}`)
    .join(';');

  function getGradientBg(gradientStops: GradientStop[] | undefined): string {
    if (!gradientStops) return '';
    return `linear-gradient(${gradientStops[0].color}, ${gradientStops[1].color})`;
  }
</script>

<div style="{cssVarStyles}" class="h-screen w-screen flex flex-col align-middle items-center">
  <div class="m-5 p-5">
    <section>
      {#if linkGroup.imageURL}
        <img src="{linkGroup.imageURL}" alt="link-group" />
      {/if}

      {#if linkGroup.description}
        <section>
          <p>{linkGroup.description}</p>
        </section>
      {/if}
    </section>
    <div class="flex flex-col align-middle items-center">
      {#each links as l}
        <div class="p-1 mb-2">
          <Button
            link="{l}"
            buttonColor="{linkGroup.theme.button.buttonColor}"
            buttonShape="{linkGroup.theme.button.buttonShape}"
            buttonTheme="{linkGroup.theme.button.buttonTheme}"
            outlineColor="{linkGroup.theme.button.outlineColor}"
            fontColor="{linkGroup.theme.button.fontColor}"
            buttonText="{getProvider(l)}"
          />
        </div>
      {/each}
    </div>
  </div>
</div>
