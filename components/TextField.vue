<template>
  <div>
    <v-container class="startScreen">
    <v-label for="task-type">{{labelTaskType}}</v-label>
    <v-text-field class = "textfield"
      id="task-type"
      v-model="taskName"
      placeholder="Введите task-type"
      trim
    ></v-text-field>
      <v-label for="device_id">{{labelDeviceId}}</v-label>
      <v-text-field class = "textfield"
                    id="device-id"
                    v-model="deviceName"
                    placeholder="Введите device_id"
                    trim
      ></v-text-field>
      <v-label for="country">{{labelCountry}}</v-label>
      <v-text-field class = "textfield"
                    id="country"
                    v-model="countryName"
                    placeholder="Введите country"
                    trim
      ></v-text-field>
      <v-label for="language">{{labelLanguage}}</v-label>
      <v-text-field class = "textfield"
                    id="language"
                    v-model="languageName"
                    placeholder="Введите language"
                    trim
      ></v-text-field>
    <v-row class="startScreen-createScenario">
      <v-col>
        <v-banner-text class="generatorScenarioName"
                       v-model="generateName"
                     v-text="generateScenarioName"
                      trim
        ></v-banner-text>
      </v-col>
      <v-col>
        <NuxtLink to="/GeneralJsonScreen">
        <v-btn @click="setNameJson">Создать сценарий</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import {placeholder} from "@babel/types";
import {mapWritableState, mapActions} from "pinia";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useSaveScenario} from "~/stores/Scenario.js";

export default {

  name:"StartScreenTextfields",
  methods: {placeholder,
  ...mapWritableState(useNameJsonFile,['nameJsonFile']),
  ...mapActions(useNameJsonFile,['$patch']),
    ...mapWritableState(useSaveScenario,['taskTypeName','deviceIdName','countryName','languageName']),
    ...mapActions(useSaveScenario, ['$patch']),
    setNameJson(){
    this.$patch({
      nameJsonFile: this.generateScenarioName,
      taskTypeName: this.taskName.toLowerCase(),
      deviceIdName: this.deviceName.toUpperCase(),
      countryName: this.countryName.toUpperCase(),
      languageName: this.languageName.toLowerCase()
    });
    }
  },
  computed: {
    generateScenarioName(){
       return this.deviceName+"_"+this.countryName.toLowerCase()+"_"+this.languageName.toLowerCase()+"_"+this.taskName.toLowerCase()+".json"
    },

  },
  data() {
    return {
      labelTaskType:"Введите task-type",
      labelDeviceId:"Введите device-id",
      labelCountry:"Введите country",
      labelLanguage:"Введите language",
      deviceName:"",
      countryName:"",
      languageName:"",
      taskName: '',
      generateName:""
    }
  },
}
</script>
