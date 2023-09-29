<template>
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
          <v-row>
          <Logo/>
          </v-row>
          <v-row>
            <h5>{{storeName.getName}}</h5>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <div v-if="store.task_tesseractspi.length === 1">
            <v-row>
              <v-row>
                <div v-if="store.getTaskTesseractspi[previewObject].type_json_object === 'json screen object'">
                  <v-col class="json_objects_general_screen">
                    <GeneralScreenListObject :current-object="previewObject+1" :type="'preview'"/>
                  </v-col>
                </div>
                <div v-else>
                  <v-col class="json_objects_general_screen">
                    <GeneralScreenListObject :current-object="previewObject+1" :type="'preview'"/>
                  </v-col>
                </div>
                <v-col  class="json_objects_general_screen">
                  <GeneralJsonObjectScreenNewJsonObject/>
                </v-col>
              </v-row>
            </v-row>
          </div>
          <div v-else-if="store.task_tesseractspi.length > 1">
            <v-row>
              <v-row>
            <div v-if="store.getTaskTesseractspi[previewObject].type_json_object === 'json static object'">
              <v-col class="json_objects_general_screen">
            <GeneralScreenListObject :current-object="previewObject+1" :type="'preview'"/>
              </v-col>
            </div>
                <div v-else>
                  <v-col class="json_objects_general_screen">
                    <GeneralScreenListObject :current-object="previewObject+1" :type="'preview'"/>
                  </v-col>
                </div>
                <div v-if="store.getTaskTesseractspi[currentObject].type_json_object === 'json static object'">
                <v-col class="json_objects_general_screen">
            <GeneralScreenListObject :current-object="currentObject+1" :type="'current'"/>
          </v-col>
                </div>
                <div v-else>
                  <v-col class="json_objects_general_screen">
                    <GeneralScreenListObject :current-object="currentObject+1" :type="'current'"/>
                  </v-col>
                </div>
            <v-col  class="json_objects_general_screen">
              <GeneralJsonObjectScreenNewJsonObject/>
            </v-col>

        </v-row>
          </v-row>
          </div>
  <div v-else>
    <v-row>
      <v-row>
  <v-col  class="json_objects_general_screen">
    <GeneralJsonObjectScreenNewJsonObject/>
  </v-col>
  </v-row>
  </v-row>
  </div>
          <v-row>
                  <v-row>
                  <v-list-item :disabled="!unlockPreviewObjects" class="preview_object_general_screen">
                    <img @click="getPreviewObjects" :src="images['backImage']" alt=""></v-list-item>
                  <v-list-item :disabled="!unlockNextObjects" class="next_object_general_screen">
                    <img @click="getNextObjects" :src="images['nextImage']" alt=""></v-list-item>
                  </v-row>
              <v-col>
                <NuxtLink to="/FinalScreen">
                <v-btn color="purple" @click="storeConvertToScenario">Сохранить сценарий</v-btn>
                </NuxtLink>
              </v-col>
          </v-row>
        </v-col>
      </v-row>
        </v-col>
  </div>
</template>

<script>

import images from "~/static/images.js"
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useCurrentObject} from "~/stores/CurrentObjectState.js";


export default {
name:"GeneralJsonScreen",
  components:['~/components'],
  data(){
  return{
    images,
    currentObject: this.storeCurrentObject.previewObject+1,
    previewObject: this.storeCurrentObject.previewObject,
    unlockPreviewObjects: this.currentObject > 2,
    unlockNextObjects: this.store.task_tesseractspi.length > 2,
  }
  },
  setup(){
  const store = useSaveScenario();
  const storeName = useNameJsonFile();
  const storeLineId = useLineId();
  const storeCurrentObject = useCurrentObject();
  return {store, storeName, storeLineId, storeCurrentObject}
  },
  methods:{
    getPreviewObjects(){
      this.previewObject--;
      this.currentObject--;
      if (this.previewObject === 0){
        this.unlockPreviewObjects = false;
      }
      this.unlockNextObjects = true;
    },
    getNextObjects(){
      this.previewObject++;
      this.currentObject++;
      this.unlockPreviewObjects = true;
      if (this.currentObject + 1 === this.store.task_tesseractspi.length){
        this.unlockNextObjects = false;
      }
    },
    async storeConvertToScenario(){

      let finalScenario = {task_type: this.store.task_type,
        device_id:this.store.device_id,
        country:this.store.country,
        language:this.store.language,
        task_tesseractspi:this.store.task_tesseractspi};

      let buffer_screen_object = null;
      let checkTextObject = null;

      for (let item = 0; item < finalScenario.task_tesseractspi.length; item++){
        if (finalScenario.task_tesseractspi[item].type_json_object ==='json screen object') {
          if (typeof finalScenario.task_tesseractspi[item].variants_screen_type[0].check_text === "object") {
            checkTextObject = finalScenario.task_tesseractspi[item].variants_screen_type[0].check_text.reduce((a, v) => ({
              ...a,
              [v.name]: v.value
            }), {});
            buffer_screen_object = JSON.parse(JSON.stringify(finalScenario.task_tesseractspi[item].variants_screen_type[0]));
            delete buffer_screen_object.check_text;
            finalScenario.task_tesseractspi[item].variants_screen_type.splice(0,1, Object.assign({},checkTextObject,buffer_screen_object));
          }
          for (let line = 0; line < finalScenario.task_tesseractspi[item].variants_screen_type[0].task_bufferspi.length; line++){
            Object.keys(finalScenario.task_tesseractspi[item].variants_screen_type[0].task_bufferspi[line]).forEach(key => {
              if (finalScenario.task_tesseractspi[item].variants_screen_type[0].task_bufferspi[line][key] === null) {
                delete finalScenario.task_tesseractspi[item].variants_screen_type[0].task_bufferspi[line][key];
              }
            });
          }
        }
        else{
          for (let line = 0; line < finalScenario.task_tesseractspi[item].task_bufferspi.length; line++){
            Object.keys(finalScenario.task_tesseractspi[item].task_bufferspi[line]).forEach(key => {
              if (finalScenario.task_tesseractspi[item].task_bufferspi[line][key] === null) {
                delete finalScenario.task_tesseractspi[item].task_bufferspi[line][key];
              }
          });
        }
      }
      }

      let scenario = JSON.stringify(finalScenario);

      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(scenario));
      element.setAttribute('download', this.storeName.nameJsonFile);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

    }
  }
}
</script>

<style lang="scss">
.json_objects_general_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview_object_general_screen{
  display:flex;
  align-items: center;
  justify-content: flex-end;
}
.next_object_general_screen{
  display:flex;
  align-items: center;
  justify-content: flex-start;
}
</style>