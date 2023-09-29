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
              <v-col cols="auto">
                <img :src="images['voteImage']" alt="">
              </v-col>
              <v-col cols="auto" class="text_final_taskType">
                <v-row>
                  <h3>Новая задача успешно добавлена:<br>
                    {{store.task_type}}</h3>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="button_final_taskType">
              <NuxtLink to="/TaskTypeScreen">
                <v-btn color="purple">Назад</v-btn>
              </NuxtLink>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>

import images from "~/static/images.js";
import {useSaveTaskType} from "~/stores/saveDB.js";

export default {
  name: "FinalTaskTypeScreen",
  components: ['~/components'],
  setup() {
    const store = useSaveTaskType()
    return {store}
  },
  data() {
    return {
      images
    }
  }
}
</script>

<style lang="scss">
.text_final_taskType{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button_final_taskType{
  display: flex;
  flex-direction: row-reverse;
}
</style>