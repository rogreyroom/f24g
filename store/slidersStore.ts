import { defineStore } from 'pinia'
import { useApiStore, Slide } from './apiDataStore'

export const useSlidesStore = defineStore('slider', () => {
	const sliders = ref<Slide[]>([])
	const currentSlide = ref()

	const data = useApiStore()
	const setSliders = () => sliders.value = data.apiData

	const nextSlide = () => currentSlide.value++
	const prevSlide = () => currentSlide.value--
	const firstSlide = () => currentSlide.value = 0

	const getSlidersLength = computed(() => sliders.value.length)

	return { sliders, currentSlide, setSliders, nextSlide, prevSlide, firstSlide, getSlidersLength }
})