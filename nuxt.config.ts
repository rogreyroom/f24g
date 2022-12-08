// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
		strict: true,
	},
	modules: [
    '@pinia/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/global.scss" as *;',
        }
      }
    }
  }
})
