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
              <v-col cols="auto" class="text_final_deviceId">
                <v-row>
                  <h3>Новое устройство успешно добавлено:<br>
                    {{store.device_id}}</h3>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="button_final_deviceId">
              <NuxtLink to="/DeviceIdScreen">
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

<style lang="scss">
.text_final_deviceId{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button_final_deviceId{
  display: flex;
  flex-direction: row-reverse;
}
</style>