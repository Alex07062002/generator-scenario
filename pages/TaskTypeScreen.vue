<template>
  <div>
    <div>
      <v-col>
        <v-row>
          <MenuBar/>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <SettingsBar/>
          </v-col>
          <v-col cols="auto">
            <Logo/>
          </v-col>
          <v-col cols="auto">
            <v-row>
              <NuxtLink to="/AddTaskTypeScreen">
              <v-btn class="button_taskType_screen">
              <img @click="" :src="images['taskTypeImage']" alt="">
              Добавить новую задачу
              </v-btn>
              </NuxtLink>
            </v-row>
            <v-row>
              <MainScreenTable/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import images from "~/static/images.js";
export default{
  name:"TaskTypeScreen",
  components:['~/components'],
  data(){
    return{
      images
    }
  }
}
</script>

<style lang="scss">
.button_taskType_screen{
  min-height: 90px;
  outline: 3px solid #000000;
  border-radius: 25px;
  margin: 10px 10px 10px 10px;
}
</style>