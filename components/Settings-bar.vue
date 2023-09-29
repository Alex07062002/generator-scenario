<template>
  <div>
    <v-list-item vertical class="SettingsBar">
      <v-list-item-title><NuxtLink to="/TaskTypeScreen"><img onclick="" :src="images['taskTypeImage']" alt="">
      </NuxtLink></v-list-item-title>
      <v-list-item-title><NuxtLink to="/DeviceIdScreen"><img  onclick="" :src="images['deviceImage']" alt="">
      </NuxtLink></v-list-item-title>
      <v-list-item-title><NuxtLink to="/CountryScreen"><img onclick="" :src="images['countryImage']" alt="">
      </NuxtLink></v-list-item-title>
      <v-list-item-title><NuxtLink to="/"><img onclick="" :src="images['scenarioImage']" alt="">
      </NuxtLink></v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import images from "~/static/images.js"


export default {
  name: 'Settings',
  data(){
    return{
      images
      }
    }
}
</script>
