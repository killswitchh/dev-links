<script lang="ts">
  import pil1 from '$lib/images/pill2.png';
  import pil2 from '$lib/images/pill3.png';
  import pil3 from '$lib/images/pill4.png';

  import sc1 from '$lib/images/sc1.png';
  import sc2 from '$lib/images/sc2.png';
  import sc3 from '$lib/images/sc3.png';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';

  let imgArr = [pil1, pil2, pil3];

  const interval = setInterval(() => {
    const popped = imgArr.pop();
    if (popped) imgArr.unshift(popped);
    imgArr = imgArr;
  }, 1500);

  onDestroy(() => clearInterval(interval));

  $: imgs = imgArr;
</script>

<section id="enhance" class="relative pt-2 pb-12 md:pt-12 md:pb-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex sm:flex-row flex-col justify-center align-middle items-center">
      <div class="relative h-[300px] mr-5">
        {#each imgs as item, index}
          {#key item}
            <!-- content here -->
            <div
              in:slide
              out:slide
              id="{`${index}`}"
              class="sm:w-[300px] w-[200px] sm:h-[150px] h-[100px] max-w-full rounded-xl
            {index === 0 ? '' : ''} 
            {index === 1 ? 'absolute left-5 top-10' : ''} 
            {index === 2 ? 'absolute left-10 top-20' : ''}"
            >
              <img src="{item}" alt="description" />
            </div>
          {/key}
        {/each}
      </div>

      <div class="ml-3 flex flex-col justify-center align-middle items-center text-center md:pb-16">
        <h1
          class="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
          data-aos="zoom-y-out"
        >
          Maximize your impact with

          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-400"
            >Enhanced Links ✨
          </span>
        </h1>
        <div class="flex flex-row justify-center mt-[3%] pl-5 pr-5">
          <p class="text-xl text-gray-600 mb-8 w-full" data-aos="zoom-y-out" data-aos-delay="150">
            We currently offer enhanced links for GitHub profiles and repositories, and plan to add
            more integrations in the near future.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="features" class="relative">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="text-center pb-12 md:pb-16">
      <h1
        class="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 mt-[10%]"
        data-aos="zoom-y-out"
      >
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-400"
          >Your Page,
        </span>
        just the way you want it to be
      </h1>
      <div class="flex flex-row justify-center mt-[3%]">
        <p class="text-xl text-gray-600 mb-8 w-full" data-aos="zoom-y-out" data-aos-delay="150">
          Make your profile stand out by changing the background colors and gradients, and adding
          your own picture. Make your link buttons uniquely yours by customizing the shape and
          color.
        </p>
      </div>
      <div class="w-full mx-auto mt-[3%] flex flex-row justify-between items-start overflow-auto">
        <figure class="max-w-lg">
          <div
            class="sm:w-[335px] w-[300px] sm:h-[587px] h-[525px] max-w-full rounded-xl overflow-hidden shadow-md shadow-white"
          >
            <img src="{sc1}" alt="description" />
          </div>
          <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Side Project Themed
          </figcaption>
        </figure>
        <figure class="max-w-lg ml-5">
          <div
            class="sm:w-[335px] w-[300px] sm:h-[587px] h-[525px] max-w-full rounded-xl overflow-hidden shadow-md shadow-white"
          >
            <img src="{sc2}" alt="description" />
          </div>
          <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Blog Themed
          </figcaption>
        </figure>
        <figure class="max-w-lg ml-5">
          <div
            class="sm:w-[335px] w-[300px] sm:h-[587px] h-[525px] max-w-full rounded-xl overflow-hidden shadow-md shadow-white"
          >
            <img src="{sc3}" alt="description" />
          </div>
          <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Competitive Coding Themed
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>
