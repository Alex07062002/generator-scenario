<template>
  <div>
    <div>
      <v-col>
        <v-row>
          <MenuBar/>
        </v-row>
        <v-row>
          <v-col cols="1">
            <SettingsBar/>
          </v-col>
          <v-col cols="3">
            <Logo/>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-img :src="images['voteImage']"></v-img>
              </v-col>
              <v-col>
                <v-row>
                  <h3>Новая задача успешно добавлена</h3>
                </v-row>
                <v-row>
                  <h3>{{store.taskType}}</h3>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <NuxtLink to="/TaskTypeScreen">
                <v-btn>Назад</v-btn>
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
    return { store }
  },
  data() {
    return {
      images
    }
  }
}
</script>
