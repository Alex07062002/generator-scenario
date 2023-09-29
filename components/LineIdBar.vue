<template>
  <v-container class="lineIdBar">
  <v-col>
    <v-row>
      <h3>Выбран тип объекта</h3>
    </v-row>
    <v-row>
      <v-btn disabled>{{typeOfJsonObject}}</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <h3>line_id:{{storeLineId.getLineNum}}</h3>
      </v-col>
      <v-col>
        <v-btn @click="deleteLineId">Удалить line_id</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="showTechCommentArea = !showTechCommentArea">tech-comment</v-btn>
      <div v-if="showTechCommentArea">
        <TechComment/>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <v-list-item><img @click="" :src="images['backImage']" alt=""></v-list-item>
      </v-col>
      <v-col>
        <v-list-item><img @click="" :src="images['nextImage']" alt=""></v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <h5>{{jsonFile}}</h5>
    </v-row>
    <div v-if="typeOfJsonObject === 'json screen object'">
      <h5>{{console.log(storeScreen.screen_type)}}</h5>
    </div>
  </v-col>
  </v-container>
</template>

<script>

import images from "~/static/images.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {mapActions, mapWritableState} from "pinia";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useFlagRecalculation} from "~/stores/FlagRecalculation.js";
import {useSaveScenario} from "~/stores/Scenario.js";
export default{
  name:"LineIdBar",
  props:{
    currentLineId: Number,
    jsonFile: String,
    typeOfJsonObject: String,
    taskBufferspi: Array
  },
  setup(){
    const store = useSaveScenario();
    const storeStatic = useStaticJson();
    const storeScreen = useScreenJson();
    const storeLineId = useLineId();
    const storeRecalculation = useFlagRecalculation();
    return{store, storeStatic, storeScreen, storeLineId, storeRecalculation}
  },
  data(){
    return {
      images,
      showTechCommentArea: false,
      isRelacated: false
    }
  },
  components:[
    '~/components'
  ],
  methods:{
    ...mapWritableState(useLineId,['line_id','tech_comment','task',
    'task_command','path','OpenCV_device_id','screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId,{changeLine:'$patch'}),
    ...mapWritableState(useFlagRecalculation,['flag','startLineId']),
    ...mapActions(useFlagRecalculation,{changeFlag:'$patch'}),
    deleteLineId() { //TODO NOT TESTING!!!
      if (this.taskBufferspi.length === 1) { //TODO Correctly
        if (confirm('Вы уверены удалить данный json object?')) {
          this.storeLineId.$reset();
          this.isRelacated = true;
        }
      } else {
        if (this.typeOfJsonObject === 'json static object' && this.storeStatic.currentLineIdInObject !== 0) {
          this.changeLine({
            line_id: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject - 1].line_id,
            task: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject - 1].task,
            task_command: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject - 1].task_command,
            tech_comment: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject - 1].tech_comment || "",
          });
          this.changeFlag({
            flag: true,
            startLineId: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].line_id // Запоминаем удалённую позицию для перерасчёта line_id
          });
          this.storeStatic.task_bufferspi.splice(this.storeStatic.currentLineIdInObject, 1);
          for (let item = this.storeStatic.currentLineIdInObject; item < this.storeStatic.task_bufferspi.length; item++) {
            this.storeStatic.task_bufferspi[item].line_id--;
          }
          for (let object = this.storeStatic.numberOfObjectInList + 1; object < this.store.taskTesseractspi.length; object++) {
            if (this.store.taskTesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.taskTesseractspi[object].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
        } else if (this.typeOfJsonObject === 'json static object') {
          this.changeLine({
            line_id: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject + 1].line_id,
            task: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject + 1].task,
            task_command: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject + 1].task_command,
            tech_comment: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject + 1].tech_comment || "",
          });
          this.changeFlag({
            flag: true,
            startLineId: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].line_id // Запоминаем удалённую позицию для перерасчёта
          });
          this.storeStatic.task_bufferspi.splice(this.storeStatic.currentLineIdInObject, 1);
          for (let item = this.storeStatic.currentLineIdInObject; item < this.storeStatic.task_bufferspi.length; item++) {
            this.storeStatic.task_bufferspi[item].line_id--;
          }
          for (let object = this.storeStatic.numberOfObjectInList + 1; object < this.store.taskTesseractspi.length; object++) {
            if (this.store.taskTesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.taskTesseractspi[object].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
        } else if (this.typeOfJsonObject === 'json screen object' && this.storeStatic.currentLineIdInObject !== 0) {
          console.log(this.storeScreen.variants_screen_type[0].task_bufferspi);
          this.changeLine({
            line_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].line_id,
            task: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].task,
            task_command: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].task_command,
            tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].tech_comment || "",
            path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].path || "",
            OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].OpenCV_device_id || "",
            target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].target_text || "",
            tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].tap_target_text || "",
            screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject - 1].screenshot_cropping || "",
          });
          this.changeFlag({
            flag: true,
            startLineId: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject].line_id // Запоминаем удалённую позицию для перерасчёта line_id
          });
          this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject].splice(this.storeScreen.currentLineIdInObject, 1);
          for (let item = this.storeScreen.variants_screen_type[0].currentLineIdInObject;
               item < this.storeScreen.variants_screen_type[0].task_bufferspi.length; item++) {
            this.storeScreen.variants_screen_type[0].task_bufferspi[item].line_id--;
          }
          for (let object = this.storeScreen.numberOfObjectInList + 1; object < this.store.taskTesseractspi.length; object++) {
            if (this.store.taskTesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.taskTesseractspi[object].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
        } else if (this.typeOfJsonObject === 'json screen object') {
          console.log(this.storeScreen.variants_screen_type[0].task_bufferspi);
          this.changeLine({
            line_id: this.storeStatic.task_bufferspi[this.storeScreen.currentLineIdInObject + 1].line_id,
            task: this.storeStatic.task_bufferspi[this.storeScreen.currentLineIdInObject + 1].task,
            task_command: this.storeStatic.task_bufferspi[this.storeScreen.currentLineIdInObject + 1].task_command,
            tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].tech_comment || "",
            path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].path || "",
            OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].OpenCV_device_id || "",
            target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].target_text || "",
            tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].tap_target_text || "",
            screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject + 1].screenshot_cropping || "",
          });
          this.changeFlag({
            flag: true,
            startLineId: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject].line_id // Запоминаем удалённую позицию для перерасчёта
          });
          this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObject].splice(this.storeScreen.currentLineIdInObject, 1);
          for (let item = this.storeScreen.currentLineIdInObject; item < this.storeScreen.variants_screen_type[0].task_bufferspi.length; item++) {
            this.storeScreen.variants_screen_type[0].task_bufferspi[item].line_id--;
          }
          for (let object = this.storeScreen.numberOfObjectInList + 1; object < this.store.taskTesseractspi.length; object++) {
            if (this.store.taskTesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.taskTesseractspi[object].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.taskTesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
        }
        this.changeFlag({
          flag: false,
          startLineId: 0
        });
      }
    }
  }
}
</script>
