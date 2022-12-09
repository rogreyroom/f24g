<script setup lang="ts">
  import { useApiStore } from '@/store/apiDataStore'
	import { useSlidesStore } from '@/store/slidersStore'

	const { getApiData } = useApiStore()
	const { setSliders } = useSlidesStore()

	onMounted(async () => {
		await getApiData()
		await setSliders()
	})
</script>

<template>
  <main class="main">
    <h1>The carousel</h1>
    <Carousel />
  </main>
</template>

<style lang="scss">
  body {
    font-family: 'Stolzl', sans-serif;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-rows: repeat(min-content, 2);
  }
  .main {
		padding: 1rem;

    @media screen and (min-width: 35em) {
      padding: 3rem;
    }
    @media screen and (orientation: landscape) and (max-width: 50em) {
      padding: 1rem;
    }

    h1 {
      color: var(--primary-color);
    }
	}
</style>