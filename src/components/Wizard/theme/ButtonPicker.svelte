<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import {
    ButtonShape,
    ButtonTheme,
    type ButtonChangeEventContent,
    type Theme,
  } from '../../../core/models/theme.dto';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { refreshIframe } from '../../../stores';
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

  async function saveButtonLayout() {
    const buttonEvent = await ApiWrapper.patch('/api/theme/button', theme?.button);
    refreshIframe.set(true);
    invalidateAll();
    return buttonEvent;
  }
</script>

<div class="w-full flex flex-col items-center mt-5">
  {#if theme != null && defaultTheme}
    <div class="flex flex-row justify-between w-[80%]">
      <div>Button Settings</div>
      <div class="w-[20%]">
        <Button
          buttonColor="{theme.button.buttonColor}"
          buttonShape="{theme.button.buttonShape}"
          fontColor="{theme.button.fontColor}"
          outlineColor="{theme.button.outlineColor}"
          buttonTheme="{theme.button.buttonTheme}"
          buttonText="{'Generated Button'}"
        />
      </div>
    </div>
    <div class="mt-5 flex flex-row justify-between w-[80%]">
      <span class="p-2"> Style </span>
      {#each buttonThemeList as buttonTheme}
        <div class="{buttonTheme === theme.button.buttonTheme ? 'border-b-4 p-1' : ''} w-[20%]">
          <Button
            on:selected="{(e) => handleButtonThemeChange(e)}"
            buttonColor="{defaultTheme.button.buttonColor}"
            buttonShape="{defaultTheme.button.buttonShape}"
            fontColor="{defaultTheme.button.fontColor}"
            outlineColor="{defaultTheme.button.outlineColor}"
            buttonTheme="{buttonTheme}"
            buttonText="{buttonTheme}"
          />
        </div>
      {/each}
    </div>
    <div class="mt-5 flex flex-row justify-between w-[80%]">
      <span class="p-2"> Shape </span>

      {#each buttonShapeList as buttonShape}
        <div class="{buttonShape === theme.button.buttonShape ? 'border-b-4 p-1' : ''}  w-[20%]">
          <Button
            on:selected="{(e) => handleButtonShapeChange(e)}"
            buttonColor="{defaultTheme.button.buttonColor}"
            buttonShape="{buttonShape}"
            fontColor="{defaultTheme.button.fontColor}"
            outlineColor="{defaultTheme.button.outlineColor}"
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
    <button
      on:click="{(event) => saveButtonLayout()}"
      class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
    >
      Save
    </button>
  {/if}
</div>
