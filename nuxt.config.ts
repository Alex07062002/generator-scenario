// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false, ssr: false},
  modules:['@pinia/nuxt'],
  css:[ "assets/styles/styles.scss?inline", "vuetify/styles/main.css", 'vue-json-pretty/lib/styles.css'],
  plugins:['plugins/vue-json-pretty'],
  build:{
    transpile:['vuetify']
  },
})
