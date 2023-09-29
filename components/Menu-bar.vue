<template>
  <div>
    <v-container class="menu-bar">
      <v-row>
        <v-col>
         <NuxtLink to="/"><img onclick="" :src="images['menuImage']" alt=""></NuxtLink>
        </v-col>
        <v-col></v-col>
        <v-col><v-img></v-img></v-col>
        <v-col class="menu-bar-text"><h3>Twilio Flex</h3></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import images from "~/static/images.js"
export default {
  name: 'MenuBar',
  data(){
    return{
      images
    }
  }
}
</script>
