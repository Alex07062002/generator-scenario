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
              <v-text-field class = "textfield" label="Идентификатор новой страны"
                            id="task-type"
                            v-model="countryNameField"
                            placeholder="Введите страну"
                            trim
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field class = "textfield" label="Идентификатор языка"
                            id="task-type"
                            v-model="languageNameField"
                            placeholder="Введите язык"
                            trim
              ></v-text-field>
            </v-row>
            <v-row class="textfield_add_country">
              <div v-if='countryNameField === "" || languageNameField === ""'>
                <v-btn @click="saveCountryLang" color="red">Сохранить</v-btn>
              </div>
              <div v-else>
                <NuxtLink to="/FinalCountryScreen"><v-btn @click="saveCountryLang" color="green">
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
import {useSaveCountryLang} from "~/stores/saveDB.js";

export default{
  name:"AddCountryScreen",
  components: [
      '~/components'
  ],
  data(){
    return{
      countryNameField: "",
      languageNameField: ""
    }
  },
  setup(){
    const store = useSaveCountryLang();
    return{store};
  },
  methods: {
    ... mapWritableState(useSaveCountryLang,['country','language']),
    ... mapActions(useSaveCountryLang,['$patch']),
    saveCountryLang(){

      this.$patch({
        country: this.countryNameField,
        language: this.languageNameField
      })
    }
  }
}
</script>

<style lang="scss">
.textfield{
  margin: 10px 10px 10px 10px;
}
.textfield_add_country{
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>