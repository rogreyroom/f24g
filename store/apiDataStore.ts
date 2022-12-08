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
			const mountainsRes: Slide[] = await $fetch('https://api.nuxtjs.dev/mountains')

			apiData.value = [...riversRes, ...planetsRes, ...mountainsRes].splice(0, 20)
		} catch (err) {
			return err
		}
	}

	return { apiData, getApiData }
})
