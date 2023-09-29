// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false, ssr: false},
  modules:['@pinia/nuxt'],
  css:["vuetify/styles/main.css",
    "primevue/resources/themes/lara-light-blue/theme.css"],
  build:{
    transpile:['vuetify', "primevue"]
  }
})
