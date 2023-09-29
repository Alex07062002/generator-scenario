<template>
  <v-container class="img-fluid">
    <NuxtLink to="/ChoiceJsonObjectScreen">
    <v-list-item><img @click="" :src="images['newImage']" alt="">
    </v-list-item>
    </NuxtLink>
  </v-container>
</template>


<script>
import images from "~/static/images.js";
export default{
  name:"NewJsonObject",
  data(){
    return{
      images
    }
  }
}
</script>
