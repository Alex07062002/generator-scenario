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
              <label for="task-type">{{labelCountry}}</label>
              <v-text-field class = "textfield"
                            id="task-type"
                            v-model="countryNameField"
                            placeholder="Введите страну"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-label for="task-type">{{labelLanguage}}</v-label>
              <v-text-field class = "textfield"
                            id="task-type"
                            v-model="languageNameField"
                            placeholder="Введите язык"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-btn @click="saveCountryLang"><NuxtLink to="/FinalCountryScreen">Сохранить</NuxtLink></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>

import {mapActions, mapWritableState} from "pinia";
import {useSaveCountryLang} from "~/stores/saveDB.js";

export default{
  name:"AddCountryScreen",
  components: [
      '~/components'
  ],
  data(){
    return{
      labelCountry:"Идентификатор новой страны",
      countryNameField: "",
      labelLanguage:"Идентификатор языка",
      languageNameField: ""
    }
  },
  computed:{
    ... mapWritableState(useSaveCountryLang,['countryName','languageName'])
  },
  mounted(){
  },
  methods: {
    ... mapActions(useSaveCountryLang,['$patch']),
    saveCountryLang(){
      this.$patch({
        countryName: this.countryNameField,
        languageName: this.languageNameField
      })
    }
  }
}
</script>
