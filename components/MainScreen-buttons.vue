<template>
  <div>
    <v-container class="buttons">
      <v-row>
        <v-col>
          <v-row>
        <v-list-item class="mainScreen-NewScenario"><NuxtLink to="/StartScreen">
          <img @click="" :src="images['newImage']" alt="">
          {{newScenario}}</NuxtLink></v-list-item>
          </v-row>
          <v-row>
        <v-list-item class="mainScreen-EditScenario"><NuxtLink to="/ExplorerEditScreen">
          <img @click="" :src="images['editImage']" alt="">
          {{editScenario}}</NuxtLink></v-list-item>
          </v-row>
        </v-col>
        <v-col>
        <v-list-item class="mainScreen-CopyScenario"><NuxtLink to="/ExplorerCopyScreen">
          <img @click="" :src="images['copyImage']" alt="">
          {{copyScenario}}</NuxtLink></v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import images from "~/static/images.js";
export default {
  name: 'MainScreen-buttons',
  data(){
    return{
      newScenario: "Создать новый сценарий",
      editScenario:"Редактировать сценарий",
      copyScenario:"Скопировать сценарий",
     images
    }
  }
}
</script>
