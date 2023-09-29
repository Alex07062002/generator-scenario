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
          <div>
          <v-col cols="auto">
            <v-container>
            <FileExplorerArea :updateFile="getNameFile"/>
            </v-container>
            <v-row class="text_explorer_edit">
              <h5>Выбранный файл:{{editFile}}</h5>
            </v-row>
            <v-row class="button_explorer_edit">
              <div v-if='editFile === ""'>
              <v-btn class="button_explorer_edit" outlined block="true" color="red">Продолжить</v-btn>
              </div>
              <div v-else>
                <NuxtLink to="/GeneralJsonScreen"><v-btn class="button_explorer_edit" outlined color="green">Продолжить
               </v-btn></NuxtLink>
              </div>
            </v-row>
          </v-col>
          </div>
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

<style lang="scss">

.button_explorer_edit{
  margin-right: 0;
  display: flex;
  flex-direction: row-reverse;
}
.text_explorer_edit{
  margin: 10px 10px 10px 10px;
}

</style>