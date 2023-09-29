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
                <v-text-field id="newNameFile" label="Сохранить как:"
                              v-model="saveAs"
                              variant="underlined"
                              placeholder="Сохранить как:"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="button_explorer_copy">
              <div v-if='copyFile === ""'>
                <v-btn outlined block="true" color="red">Продолжить</v-btn>
              </div>
              <div v-else>
                  <NuxtLink to="/GeneralJsonScreen"><v-btn @click="setNameCopyFile" outlined color="green">Продолжить
                  </v-btn></NuxtLink>
                </div>
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
      if (!this.saveAs.includes(".json") && this.saveAs !== ""){
        name = this.saveAs.split('.')[0] + ".json";
      }
      else if (this.saveAs === ""){
        name = this.copyFile;
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

<style lang="scss">
.button_explorer_copy{
  margin-right: 0;
  display: flex;
  flex-direction: row-reverse;
}
</style>