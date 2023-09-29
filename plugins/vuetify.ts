import {createVuetify} from 'vuetify'
// @ts-ignore
import * as components from 'vuetify/lib/components'
// @ts-ignore
import * as directives from 'vuetify/lib/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


export default defineNuxtPlugin((nuxt) =>{
const vuetify = createVuetify({
    ssr: true,
    components,
    directives
});
    nuxt.vueApp.use(vuetify)
})