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
              <h5>Выбранный файл:{{editFile}}</h5>
            </v-row>
            <v-row>
              <v-btn><NuxtLink to="/GeneralJsonScreen">Продолжить</NuxtLink></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import {mapWritableState, mapActions} from "pinia";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";

export default {
  name: 'ExplorerEditScreen',
  components: ['~/components'],
  data(){
    return{
      editFile: ""
    }
  },
  methods:{
    ...mapWritableState(useNameJsonFile,['nameJsonFile']),
    ...mapActions(useNameJsonFile,['$patch']),
    getNameFile(data){
      this.editFile = data.nameJsonFile;
      this.$patch({
        nameJsonFile: data.nameJsonFile
      });
    }
  }
};
</script>
