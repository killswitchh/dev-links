<script lang="ts">
  import {
    ButtonShape,
    ButtonTheme,
    type ButtonChangeEventContent,
    type Theme,
  } from '../../../core/models/theme.dto';
  import Button from '../../consumer/Button.svelte';

  export let theme: Theme | undefined;
  const defaultTheme = theme;

  const buttonThemeList: ButtonTheme[] = Object.values(ButtonTheme);
  const buttonShapeList: ButtonShape[] = Object.values(ButtonShape);

  function handleButtonThemeChange(event: CustomEvent<ButtonChangeEventContent>) {
    if (!theme) {
      return;
    }
    theme.button.buttonTheme = event.detail.buttonTheme;
  }

  function handleButtonShapeChange(event: CustomEvent<ButtonChangeEventContent>) {
    if (!theme) {
      return;
    }
    theme.button.buttonShape = event.detail.buttonShape;
  }
</script>

<div class="h-[50%] w-full flex flex-col items-center mt-5">
  {#if theme != null && defaultTheme}
    <div class="flex flex-row justify-between w-[80%]">
      <div>Button Settings</div>
      <Button
        buttonColor="{theme.button.buttonColor}"
        buttonShape="{theme.button.buttonShape}"
        fontColor="{theme.button.fontColor}"
        outlineColor="{theme.button.outlineColor}"
        buttonTheme="{theme.button.buttonTheme}"
        buttonText="{'Generated Button'}"
      />
    </div>
    <div class="mt-5 flex flex-row justify-between w-[80%]">
      <span class="p-2"> Style </span>
      {#each buttonThemeList as buttonTheme}
        <div class="{buttonTheme === theme.button.buttonTheme ? 'border-b-4 p-1' : ''}">
          <Button
            selected="{buttonTheme === theme.button.buttonTheme}"
            on:selected="{(e) => handleButtonThemeChange(e)}"
            buttonColor="{defaultTheme.button.buttonColor}"
            buttonShape="{defaultTheme.button.buttonShape}"
            fontColor="{defaultTheme.button.fontColor}"
            outlineColor="{theme.button.outlineColor}"
            buttonTheme="{buttonTheme}"
            buttonText="{buttonTheme}"
          />
        </div>
      {/each}
    </div>
    <div class="mt-5 flex flex-row justify-between w-[80%]">
      <span class="p-2"> Shape </span>

      {#each buttonShapeList as buttonShape}
        <div class="{buttonShape === theme.button.buttonShape ? 'border-b-4 p-1' : ''}">
          <Button
            selected="{buttonShape === theme.button.buttonShape}"
            on:selected="{(e) => handleButtonShapeChange(e)}"
            buttonColor="{defaultTheme.button.buttonColor}"
            buttonShape="{buttonShape}"
            fontColor="{defaultTheme.button.fontColor}"
            outlineColor="{theme.button.outlineColor}"
            buttonTheme="{defaultTheme.button.buttonTheme}"
            buttonText="BUTTON"
          />
        </div>
      {/each}
    </div>

    <div class="mt-5 flex flex-row justify-around w-[80%]">
      {#if theme.button.buttonTheme === ButtonTheme.FILL || theme.button.buttonTheme === ButtonTheme.SHADOW}
        <label>
          <input style="padding:0" type="color" bind:value="{theme.button.buttonColor}" />
          Button Color
        </label>
      {/if}
      {#if theme.button.buttonTheme === ButtonTheme.OUTLINE}
        <label>
          <input style="padding:0" type="color" bind:value="{theme.button.outlineColor}" />
          Outline Color
        </label>
      {/if}
      <label>
        <input style="padding:0" type="color" bind:value="{theme.button.fontColor}" />
        Font Color
      </label>
    </div>
  {/if}
</div>
