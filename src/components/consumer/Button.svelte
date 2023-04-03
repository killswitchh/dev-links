<script lang="ts">
  import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import type { Link } from '../../core/models/link.dto';
  import { ButtonShape, ButtonTheme, type ButtonChangeEvent } from '../../core/models/theme.dto';

  export let buttonText: string;
  export let buttonTheme: ButtonTheme;
  export let buttonShape: ButtonShape;
  export let buttonColor: string;
  export let fontColor: string;
  export let outlineColor: string;
  export let selected = false;
  export let link: Link | null = null;

  const dispatch = createEventDispatcher<ButtonChangeEvent>();

  function buttonClicked() {
    dispatch('selected', {
      buttonText,
      buttonTheme,
      buttonShape,
      buttonColor,
      fontColor,
      outlineColor,
    });

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

<button on:click="{buttonClicked}" style="{cssVarStyles}" class="p-2 cursor-pointer w-[150px]">
  {buttonText}
</button>
