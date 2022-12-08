import { defineStore } from 'pinia'

export interface Slide {
	title: string,
	image: string
}

export const useApiStore = defineStore('api', () => {
	const apiData = ref<Slide[]>([])

	const getApiData = async () => {
		try {
			const riversRes: Slide[] = await $fetch('https://api.nuxtjs.dev/rivers')
			const planetsRes: Slide[] = await $fetch('https://api.nuxtjs.dev/planets')

			apiData.value = [...riversRes, ...planetsRes]
		} catch (err) {
			return err
		}
	}

	return { apiData, getApiData }
})
