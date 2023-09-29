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
              <v-label for="task-type">{{labelDeviceId}}</v-label>
              <v-text-field class = "textfield"
                            id="task-type"
                            v-model="deviceIdField"
                            placeholder="Введите device_id"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-label for="task-type">{{labelOptionDeviceId}}</v-label>
              <v-text-field class = "textfield"
                            id="task-type"
                            v-model="optionDeviceIdField"
                            placeholder="Введите дополнительное название device_id"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-btn @click="saveDeviceId"><NuxtLink to="/FinalDeviceIdScreen">Сохранить</NuxtLink></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import {mapActions, mapWritableState} from "pinia";
import {useSaveDeviceId} from "~/stores/saveDB.js";

export default{
  name:"AddDeviceIdScreen",
  components: [
      '~/components'
  ],

  data(){
    return{
      labelDeviceId:"device_id устройства",
      deviceIdField: "",
      labelOptionDeviceId:"Доп. название устройства",
      optionDeviceIdField: ""
    }
  },
  computed:{
    ... mapWritableState(useSaveDeviceId,['deviceIdName','optionDeviceIdName'])
  },
  mounted(){
  },
  methods: {
    ... mapActions(useSaveDeviceId,['$patch']),
    saveDeviceId(){
      this.$patch({
        deviceIdName: this.deviceIdField,
        optionDeviceIdName: this.optionDeviceIdField
      })
    }
  }
}
</script>
