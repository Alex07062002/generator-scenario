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
          <v-col cols="8">
            <v-row>
              <v-list-item><NuxtLink to="/AddDeviceIdScreen"><img @click="" :src="images['deviceImage']" alt="">
              Добавить новое устройство</NuxtLink></v-list-item>
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
import images from "~/static/images.js"
export default{
  name:"DeviceIdScreen",
  components:[
      '~/components'
  ],
  data(){
    return{
      images
    }
  }
}
</script>
