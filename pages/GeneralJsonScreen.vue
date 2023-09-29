<template>
  <div class="text-xl-center">
    <v-col>
      <v-row>
        <MenuBar/>
      </v-row>
      <v-row>
        <v-col cols="1">
          <SettingsBar/>
        </v-col>
        <v-col cols="3">
          <v-row>
          <Logo/>
          </v-row>
          <v-row>
            <h5>{{storeName.getName}}</h5>
          </v-row>
        </v-col>
        <v-col>
          <div v-if="store.taskTesseractspi.length !== 0">
            <v-row>
              <v-row>
            <div v-if="store.getTaskTesseractspi[previewObject].type_json_object === 'json static object'">
              <v-col>
            <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[previewObject].type_json_object"
                                     :screen-type="store.getTaskTesseractspi[previewObject].screen_type"
                                     :input-array="store.getTaskTesseractspi[previewObject].task_bufferspi"
                                     :current-object="previewObject+1" />
              </v-col>
            </div>
                <div v-else>
                  <v-col>
                    <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[previewObject].type_json_object"
                                             :screen-type="store.getTaskTesseractspi[previewObject].screen_type"
                                             :input-array="store.getTaskTesseractspi[previewObject].variants_screen_type"
                                             :current-object="previewObject+1" />
                  </v-col>
                </div>
                <div v-if="store.getTaskTesseractspi[currentObject].type_json_object === 'json static object'">
                <v-col>
            <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[currentObject].type_json_object"
                                     :screen-type="store.getTaskTesseractspi[currentObject].screen_type"
                                     :input-array="store.getTaskTesseractspi[currentObject].task_bufferspi"
                                     :current-object="currentObject+1" />
          </v-col>
                </div>
                <div v-else>
                  <v-col>
                    <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[currentObject].type_json_object"
                                             :screen-type="store.getTaskTesseractspi[currentObject].screen_type"
                                             :input-array="store.getTaskTesseractspi[currentObject].variants_screen_type"
                                             :current-object="currentObject+1" />
                  </v-col>
                </div>

            <v-col>
              <GeneralJsonObjectScreenNewJsonObject/>
            </v-col>
        </v-row>
          </v-row>
          </div>
          <div v-else-if="store.taskTesseractspi.length === 1">
            <v-row>
              <v-row>
                <div v-if="store.getTaskTesseractspi[previewObject].type_json_object === 'json screen object'">
                  <v-col>
                    <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[previewObject].type_json_object"
                                             :screen-type="store.getTaskTesseractspi[previewObject].screen_type"
                                             :input-array="store.getTaskTesseractspi[previewObject].variants_screen_type"
                                             :current-object="previewObject+1"/>
                  </v-col>
                </div>
                <div v-else>
                  <v-col>
                    <GeneralScreenListObject :type-json-object="store.getTaskTesseractspi[previewObject].type_json_object"
                                             :screen-type="store.getTaskTesseractspi[previewObject].screen_type"
                                             :input-array="store.getTaskTesseractspi[previewObject].task_bufferspi"
                                             :current-object="previewObject+1"/>
                  </v-col>
                </div>
            <v-col>
              <GeneralJsonObjectScreenNewJsonObject/>
            </v-col>
        </v-row>
          </v-row>
          </div>
  <div v-else>
    <v-row>
      <v-row>
  <v-col>
    <GeneralJsonObjectScreenNewJsonObject/>
  </v-col>
  </v-row>
  </v-row>
  </div>
          <v-row>
            <v-row>
              <v-col>
                <div v-if="previewObject === 0">
                  </div>
                <div v-else>
                  <v-list-item><img @click="getPreviewObjects" :src="images['backImage']" alt=""></v-list-item>
                </div>
              </v-col>
              <v-col>
                <div v-if="currentObject+1 >= store.taskTesseractspi.length">
                </div>
                <div v-else>
                  <v-list-item><img @click="getNextObjects" :src="images['nextImage']" alt=""></v-list-item>
                </div>
              </v-col>
              <v-col>
                <NuxtLink to="/FinalScreen">
                <v-btn>Сохранить сценарий</v-btn>
                </NuxtLink>
              </v-col></v-row>
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

export default {
name:"GeneralJsonScreen",
  components:['~/components'],
  data(){
  return{
    images,
    currentObject: 1,
    previewObject: 0,
  }
  },
  setup(){
  const store = useSaveScenario();
  const storeName = useNameJsonFile();
  const storeLineId = useLineId();
  return {store, storeName, storeLineId}
  },
  methods:{
    getPreviewObjects(){
      this.previewObject--;
      this.currentObject--;
    },
    getNextObjects(){
      this.previewObject++;
      this.currentObject++;
    }
  }
}
</script>
