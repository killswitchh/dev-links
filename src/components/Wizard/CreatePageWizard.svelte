<script lang="ts">
  import { Steps } from 'svelte-steps';
  import { wizardStore, type WizardStep } from '../../stores';
  import CreateLinks from './links/CreateLinks.svelte';
  let wizardSteps: WizardStep[] = [];
  wizardStore.subscribe((x) => {
    wizardSteps = x.steps;
  });

  let currentStep = 0;

  const buttonClicked = (e: CustomEvent<any>) => {
    currentStep = e.detail.current;
  };

  const updateCurrentStep = (incrementer: number, disabled: boolean) => {
    if (disabled) {
      return;
    }
    currentStep += incrementer;
  };

  const createPage = () => {
    console.log('Creating Page');
  };

  $: isLastStep = () => currentStep === wizardSteps.length;
</script>

<div class="w-[70%] border-l-amber-900 flex flex-row justify-center">
  <div class="h-full w-full py-16">
    <div class="h-full w-full container mx-auto">
      <Steps
        size="2rem"
        line="2rem"
        steps="{wizardSteps}"
        current="{currentStep}"
        on:click="{(e) => buttonClicked(e)}"
      />
      {#if currentStep == 0}
        <CreateLinks />
      {/if}
      <div class="m-2 flex flex-row justify-between">
        <button
          type="button"
          disabled="{currentStep <= 0}"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          on:click="{() => updateCurrentStep(-1, currentStep <= 0)}"
        >
          Previous
        </button>

        <button
          type="button"
          disabled="{currentStep > wizardSteps.length}"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          on:click="{() =>
            isLastStep()
              ? createPage()
              : updateCurrentStep(1, currentStep > wizardSteps.length - 1)}"
        >
          {isLastStep() ? 'Create' : 'Next'}
        </button>
      </div>
    </div>
  </div>
</div>
