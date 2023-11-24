import VueJsonPretty from 'vue-json-pretty'

export default defineNuxtPlugin((nuxt) =>{
    nuxt.vueApp.component("vue-json-pretty",VueJsonPretty)
})

