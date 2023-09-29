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
          <v-responsive
              class="mx-auto"
              max-width="500"
          >
          <v-col cols="auto">
            <v-row>
              <v-text-field class = "textfield" label="device_id устройства"
                            id="task-type"
                            v-model="deviceIdField"
                            placeholder="Введите device_id"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field class = "textfield" label="Доп. название устройства"
                            id="task-type"
                            v-model="optionDeviceIdField"
                            placeholder="Введите дополнительное название device_id"
                            trim
              ></v-text-field>
            </v-row>
            <v-row class="textfield_add_deviceId">
              <div v-if='deviceIdField === "" || optionDeviceIdField === ""'>
                <v-btn @click="saveDeviceId" color="red">Сохранить</v-btn>
              </div>
              <div v-else>
                <NuxtLink to="/FinalDeviceIdScreen"><v-btn @click="saveDeviceId" color="green">
                Сохранить</v-btn></NuxtLink>
              </div>
            </v-row>
          </v-col>
          </v-responsive>
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
      deviceIdField: "",
      optionDeviceIdField: ""
    }
  },
  computed:{

  },
  methods: {
    ... mapWritableState(useSaveDeviceId,['device_id','option_device_id']),
    ... mapActions(useSaveDeviceId,['$patch']),
    saveDeviceId(){
      this.$patch({
        device_id: this.deviceIdField,
        option_device_id: this.optionDeviceIdField
      })
    }
  }
}
</script>

<style lang="scss">
.textfield{
  margin: 10px 10px 10px 10px;
}
.textfield_add_deviceId{
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>