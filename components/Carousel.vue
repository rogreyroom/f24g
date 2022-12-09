<script setup lang="ts">
	import { useSlidesStore } from '@/store/slidersStore';
	import { SwipeDirection, useDebounceFn, useLocalStorage, useSwipe } from '@vueuse/core'
	import { storeToRefs } from 'pinia';

	const slidersStore = useSlidesStore()
	const { sliders, currentSlide,  getSlidersLength } = storeToRefs(slidersStore)
	const { prevSlide, nextSlide, firstSlide } = slidersStore
  const useSlidersAction = useDebounceFn(() => { nextSlide() }, 5000)
  const formatNumberToString = (num: number):string => {
    if (num < 10) return `0${num}`
    return `${num}`
  }
  const imageSwipe = ref<HTMLElement | null>(null)
  useSwipe(imageSwipe, {
    onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
      if (direction === 'LEFT') nextSlide()
      if (direction === 'RIGHT') prevSlide()
    },
  })

  currentSlide.value = useLocalStorage('f24gCurrSlide', 0).value
  useSlidersAction()

	watch(currentSlide, () => {
		if ( currentSlide.value >= getSlidersLength.value ) firstSlide()
    if ( currentSlide.value < 0 ) firstSlide()
    useSlidersAction()
		localStorage.setItem('f24gCurrSlide', `${currentSlide.value}`)
	})
</script>

<template>
  <section class="carousel">
		<p v-if="(getSlidersLength === 0)" class="carousel__loader">Loading....</p>
		<div v-else class="carousel__container" ref="imageSwipe">
      <ul class="sliders">
				<li v-for="(slide, index) in sliders" :key="index" class="sliders__slide">
					<img :src="slide.image" :alt="slide.title" class="sliders__image" />
				</li>
			</ul>
		</div>
		<div class="carousel__navbar navbar">
			<nav class="navbar__nav nav">
				<button class="nav__btn" @click="prevSlide"><ArrowLeft /></button>
        <button class="nav__btn" @click="nextSlide"><ArrowRight /></button>
			</nav>
			<div class="navbar__info">
				<p class="navbar__text">
          {{ formatNumberToString((getSlidersLength === 0 ? 0 : currentSlide +1)) }}
          <span class="navbar__text--grey">/ {{ formatNumberToString(getSlidersLength) }}</span>
        </p>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.carousel {
		--current-slide: v-bind(currentSlide);

		display: grid;
		grid-template-rows: 60vw min-content;
    grid-template-columns: 1fr;

    @media screen and (orientation: landscape) and (max-width: 50em) {
      grid-template-rows: 80vh min-content;
    }

    @media screen and (min-width: 65em) {
      grid-template-rows: 50vh min-content;
      grid-template-columns: 60vw;
    }

		&__loader {
      font-size: 1.5rem;
      color: var(--primary-color);

      @media screen and (min-width: 30em) {
        font-size: 3rem;
      }
    }

		&__container {
      overflow: hidden;
      will-change: transform;
      border-radius: 1rem;
      width: 100%;
      height: 100%;
		}

		&__navbar {
      padding: 0 .5rem;

      @media screen and (min-width: 30em) {
        padding: 0 1.5rem;
      }

      @media screen and (min-width: 65em) {
        padding: 0 2rem;
      }
    }
	}

	.navbar {
		display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: .5rem;

    @media screen and (min-width: 30em) {
      padding-top: 1rem;
    }

		&__info {
      padding-right: 1rem;
    }

    &__text {
      font-size: 1rem;
      font-weight: bold;
      color: var(--primary-color);

      &--grey {
        color: var(--grey-light)
      }
    }
	}

	.nav {
    display: flex;
    gap: .5rem;

		&__btn {
			background-color: transparent;
      border: none;
			padding: 0 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
		}
	}

	.sliders {
		list-style: none;
    margin: 0;
    padding: 0;
		width: 100%;
		height: 100%;

		display: flex;
		transition: transform 0.5s;
    transform: translateX(calc(-100% * var(--current-slide)));

		&__slide {
			flex: 0 0 100%;
      width: 100%;
		}

		&__image {
			width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
		}
	}

</style>
