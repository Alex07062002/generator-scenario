<template>
  <div class="SettingsBar">
    <v-col>
      <v-row>
      <NuxtLink to="/TaskTypeScreen"><img :src="images['taskTypeImage']" alt="">
      </NuxtLink>
      </v-row>
      <v-row>
      <NuxtLink to="/DeviceIdScreen"><img :src="images['deviceImage']" alt="">
      </NuxtLink>
      </v-row>
      <v-row>
      <NuxtLink to="/CountryScreen"><img :src="images['countryImage']" alt="">
      </NuxtLink>
      </v-row>
      <v-row>
      <NuxtLink to="/"><img :src="images['scenarioImage']" alt="">
      </NuxtLink>
      </v-row>
    </v-col>
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
