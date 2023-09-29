<template>
  <div>
    <v-container class="buttons">
      <v-row>
        <v-col>
          <v-row>
            <NuxtLink to="/StartScreen">
            <v-btn class="button_main_screen">
          <img :src="images['newImage']" alt="">
          {{newScenario}}
            </v-btn>
            </NuxtLink>
          </v-row>
          <v-row>
            <NuxtLink to="/ExplorerEditScreen">
            <v-btn class="button_main_screen">
          <img :src="images['editImage']" alt="">
          {{editScenario}}
            </v-btn>
            </NuxtLink>
          </v-row>
        </v-col>
        <v-col>
          <NuxtLink to="/ExplorerCopyScreen">
          <v-btn class="button_main_screen">
          <img :src="images['copyImage']" alt="">
          {{copyScenario}}
          </v-btn>
          </NuxtLink>
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

<style lang="scss">
.button_main_screen{
  min-height: 90px;
  outline: 3px solid #000000;
  border-radius: 25px;
  margin: 10px 10px 10px 10px;
}
</style>