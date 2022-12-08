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
          reset: '@use "@/assets/style/_reset.scss" as reset;',
          fonts: '@use "@/assets/style/_fonts.scss" as fonts;'
        }
      }
    }
  }
})
