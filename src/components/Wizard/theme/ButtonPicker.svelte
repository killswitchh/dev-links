<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { ButtonShape, ButtonTheme } from '@prisma/client';
  import type { ButtonChangeEventContent, RTheme } from '../../../core/models/theme.dto';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { loading, refreshIframe } from '../../../stores';
  import Loader from '../../common/Loader.svelte';
  import Button from '../../consumer/Button.svelte';

  export let theme: RTheme;
  export let defaultTheme: RTheme;

  const buttonThemeList: ButtonTheme[] = Object.values(ButtonTheme);
  const buttonShapeList: ButtonShape[] = Object.values(ButtonShape);

  function handleButtonThemeChange(event: CustomEvent<ButtonChangeEventContent>) {
    if (!theme || !theme.button) {
      return;
    }
    theme.button.buttonTheme = event.detail.buttonTheme;
  }

  function handleButtonShapeChange(event: CustomEvent<ButtonChangeEventContent>) {
    if (!theme || !theme.button) {
      return;
    }
    theme.button.buttonShape = event.detail.buttonShape;
  }

  async function saveButtonLayout() {
    loading.updateLoadingForId(theme.id, true);
    const buttonEvent = await ApiWrapper.patch('/api/theme/button', theme?.button);
    refreshIframe.set(true);
    loading.updateLoadingForId(theme.id, false);
    invalidateAll();
    return buttonEvent;
  }
</script>

<div class="w-full flex flex-col bg-white dark:bg-neutral-700 rounded-lg px-8">
  {#if theme != null && defaultTheme}
    <div class="flex flex-row justify-between mt-5 items-center">
      <h1
        class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"
      >
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
          >Button Settings</span
        >
      </h1>

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

    <div class="mt-5 flex flex-row justify-evenly w-full pt-6 pb-6">
      <div class="text-2xl pt-2 min-w-[150px]">Style</div>
      <div class="flex flex-row justify-between w-full ml-5">
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
    </div>

    <div class="mt-5 flex flex-row justify-evenly w-full pt-6 pb-6">
      <div class="text-2xl pt-2 min-w-[150px]">Shape</div>
      <div class="flex flex-row justify-between w-full ml-5">
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
    </div>

    <div class="mt-5 flex flex-row justify-around w-full">
      <div class="text-2xl min-w-[150px]">Color</div>
      <div class="flex flex-row justify-between w-full ml-5">
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
    </div>
    <div class="w-full flex flex-row justify-end mt-5">
      <button
        on:click="{() => saveButtonLayout()}"
        disabled="{$loading.get(theme.id)}"
        class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      >
        Save
      </button>
      {#if $loading.get(theme.id)}
        <Loader />
      {/if}
    </div>
  {/if}
</div>
