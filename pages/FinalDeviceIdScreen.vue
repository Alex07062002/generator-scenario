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
                  <h3>Новое устройство успешно добавлено</h3>
                </v-row>
                <v-row>
                  <h3>{{store.deviceId}}</h3>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <NuxtLink to="/DeviceIdScreen">
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
import {useSaveDeviceId} from "~/stores/saveDB.js";

export default{
  name:"FinalDeviceIdScreen",
  components:['~/components'],
  data(){
    return{
      images
    }
  },
  setup(){
      const store = useSaveDeviceId();
    return{store}
  }
}
</script>
