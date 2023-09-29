import {createVuetify} from 'vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'

export default defineNuxtPlugin((nuxt) =>{
const vuetify = createVuetify({
    ssr: true,
    components,
    directives
});
    nuxt.vueApp.use(vuetify)
})