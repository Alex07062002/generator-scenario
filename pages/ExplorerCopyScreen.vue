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
              <FileExplorerArea :updateFile="getNameFile"/>
            </v-row>
            <v-row>
              <v-col>
                <h3>Выбранный файл:</h3>
              </v-col>
              <h3>{{copyFile}}</h3>
            </v-row>
            <v-row>
              <v-col>
                <h3>Сохранить как:</h3>
              </v-col>
              <v-col>
                <v-text-field id="newNameFile"
                              v-model="saveAs"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn @click="setNameCopyFile"><NuxtLink to="/GeneralJsonScreen">Продолжить</NuxtLink></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {mapActions} from "pinia";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";

export default {
  name: 'ExplorerCopyScreen',
  components: ['~/components'],
  data() {
    return {
      copyFile:"",
      saveAs: ""
    };
  },
  methods: {
    ...mapWritableState(useNameJsonFile,['nameJsonFile']),
    ...mapActions(useNameJsonFile,['$patch']),
    setNameCopyFile(){
      let name = "";
      if (!this.saveAs.includes(".json")){
        name = this.saveAs.split('.')[0] + ".json";
      }
      else{
        name = this.saveAs;
      }
      this.$patch({
        nameJsonFile: name
      })
    },
    getNameFile(data){
      this.copyFile = data.nameJsonFile;
    }
  },
}
</script>
