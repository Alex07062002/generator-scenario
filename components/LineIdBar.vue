<template>
  <v-container class="lineIdBar">
  <v-col>
    <v-row>
      <h3>Выбран тип объекта</h3>
    </v-row>
    <v-row>
      <div v-if="typeOfJsonObject === 'json static object'">
      <v-btn color="blue">{{storeStatic.type_json_object}}</v-btn>
      </div>
      <div v-else>
        <v-btn color="orange">{{storeScreen.type_json_object}}</v-btn>
      </div>
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
    </v-row>
    <v-row>
    <div v-if="showTechCommentArea">
        <TechComment :type-of-json-object="typeOfJsonObject"/>
      </div>
    </v-row>
    <div v-if="typeOfJsonObject === 'json static object'">
    <v-row>
      <div v-if="storeStatic.currentLineIdInObject === 0">
        <v-col>
          <v-list-item :disabled="true"><img @click="previewTask" :src="images['backImage']" alt=""></v-list-item>
        </v-col>
      </div>
      <div v-else>
          <v-col>
            <v-list-item><img @click="previewTask" :src="images['backImage']" alt=""></v-list-item>
          </v-col>
      </div>
        <div v-if="storeStatic.currentLineIdInObject+1 === storeStatic.task_bufferspi.length &&
storeStatic.numberOfObjectInList+1 !== store.task_tesseractspi.length">
          <v-col>
            <v-list-item :disabled="true"><img @click="nextTask" :src="images['nextImage']" alt=""></v-list-item>
          </v-col>
        </div>
      <div v-else>
        <v-col>
          <v-list-item><img @click="nextTask" :src="images['nextImage']" alt=""></v-list-item>
        </v-col>
      </div>
    </v-row>
    </div>
      <div v-else>
        <v-row>
          <div v-if="storeScreen.currentLineIdInObjectScreen === 0">
            <v-col>
              <v-list-item :disabled="true"><img @click="previewTask" :src="images['backImage']" alt=""></v-list-item>
            </v-col>
          </div>
          <div v-else>
            <v-col>
              <v-list-item><img @click="previewTask" :src="images['backImage']" alt=""></v-list-item>
            </v-col>
          </div>
        <div v-if="storeScreen.currentLineIdInObjectScreen+1 === storeVariants.task_bufferspi_screen.length &&
storeScreen.numberOfObjectInList+1 !== store.task_tesseractspi.length">
        <v-col>
          <v-list-item :disabled="true"><img @click="nextTask" :src="images['nextImage']" alt=""></v-list-item>
        </v-col>
      </div>
          <div v-else>
            <v-col>
              <v-list-item><img @click="nextTask" :src="images['nextImage']" alt=""></v-list-item>
            </v-col>
          </div>
        </v-row>
      </div>
    <v-row>
      <h5>{{storeNameJson.getName}}</h5>
    </v-row>
  </v-col>
  </v-container>
</template>

<script>

import images from "~/static/images.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {mapActions, mapWritableState} from "pinia";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {useCurrentObject} from "~/stores/CurrentObjectState.js";
export default{
  name:"LineIdBar",
  props:{
    currentLineId: Number,
    typeOfJsonObject: String,
    taskBufferspi: Array
  },
  setup(){
    const store = useSaveScenario();
    const storeStatic = useStaticJson();
    const storeScreen = useScreenJson();
    const storeLineId = useLineId();
    const storeNameJson = useNameJsonFile();
    const storeVariants = useVariantsScreenType();
    const storeCurrentObject = useCurrentObject();
    return{store, storeStatic, storeScreen, storeLineId,storeNameJson, storeVariants, storeCurrentObject}
  },
  data(){
    return {
      images,
      showTechCommentArea: false,
      isRelacated: false,
    }
  },
  components:[
    '~/components'
  ],
  methods:{
    ...mapWritableState(useLineId,['line_id','tech_comment','task',
    'task_command','path','OpenCV_device_id','screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId,{changeLine:'$patch'}),
    ...mapWritableState(useCurrentObject,['currentObject']),
    deleteLineId() {

      if (this.typeOfJsonObject === 'json static object'){
      if (this.taskBufferspi.length === 1) {

        if (confirm('Вы уверены удалить данный json static object?')) {

          if (this.storeCurrentObject.previewObject+2 === this.store.task_tesseractspi.length &&
              this.storeCurrentObject.previewObject !== 0){
            this.storeCurrentObject.decrementCurrent();
          }

          this.store.task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1);
          for (let object = this.storeStatic.numberOfObjectInList; object < this.store.task_tesseractspi.length; object++) {
            if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
          this.storeLineId.$reset();
          this.storeStatic.$reset();
          navigateTo("/GeneralJsonScreen")
        }
      }
      else if (this.storeStatic.currentLineIdInObject !== 0){

        this.storeLineId.decrement();

        this.storeStatic.decrement();

        this.changeLine({
          task: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task,
          task_command: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task_command,
          tech_comment: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].tech_comment || null,
        });

        // Удаляем конкретную строку
        this.storeStatic.task_bufferspi.splice(this.storeStatic.currentLineIdInObject+1, 1);

        // Изменяем номер line_id в данном объекте
        for (let item = this.storeStatic.currentLineIdInObject+1; item < this.storeStatic.task_bufferspi.length; item++) {
          this.storeStatic.task_bufferspi[item].line_id--;
        }
        // Изменяем номер line_id в последующих объектах
        for (let object = this.storeStatic.numberOfObjectInList + 1; object < this.store.task_tesseractspi.length; object++) {
          if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
            for (let item = 0; item < this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
              this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
            }
          } else {
            for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
              this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
            }
          }
        }
      }
      else{

        this.storeStatic.task_bufferspi.splice(this.storeStatic.currentLineIdInObject+1, 1);

        for (let item = this.storeStatic.currentLineIdInObject+1; item < this.storeStatic.task_bufferspi.length; item++) {
          this.storeStatic.task_bufferspi[item].line_id--;
        }

        for (let object = this.storeStatic.numberOfObjectInList + 1; object < this.store.task_tesseractspi.length; object++) {
          if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
            for (let item = 0; item< this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
              this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
            }
          } else {
            for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
              this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
            }
          }
        }
      }
      }
      else {

        if (this.storeScreen.variants_screen_type[0].task_bufferspi.length === 1) {

          if (confirm('Вы уверены удалить данный json screen object?')) {

            if (this.storeCurrentObject.previewObject+2 === this.store.task_tesseractspi.length &&
                this.storeCurrentObject.previewObject !== 0){
              this.storeCurrentObject.decrementCurrent();
            }
            this.store.task_tesseractspi.splice(this.storeScreen.numberOfObjectInList,1);
            for (let object = this.storeScreen.numberOfObjectInList; object < this.store.task_tesseractspi.length; object++) {
              if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
                for (let item = 0; item< this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
                  this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
                }
              } else {
                for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                  this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
                }
              }
            }
            this.storeLineId.$reset();
            this.storeScreen.$reset();
            navigateTo("/GeneralJsonScreen")
          }
        }
        else if (this.storeScreen.currentLineIdInObjectScreen !== 0) {

          this.storeLineId.decrement();

          this.storeScreen.variants_screen_type[0].task_bufferspi.splice(this.storeScreen.currentLineIdInObjectScreen, 1);

          this.storeScreen.decrementScreen();

          this.changeLine({

            task: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task,
            task_command: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task_command,
            tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tech_comment || null,
            path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].path || null,
            OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].OpenCV_device_id || null,
            target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].target_text || null,
            tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tap_target_text || null,
            screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].screenshot_cropping || null,

          });

          for (let item = this.storeScreen.currentLineIdInObjectScreen+1;
               item < this.storeScreen.variants_screen_type[0].task_bufferspi.length; item++) {
            this.storeScreen.variants_screen_type[0].task_bufferspi[item].line_id--;
          }

          for (let object = this.storeScreen.numberOfObjectInList + 1; object < this.store.task_tesseractspi.length; object++) {
            if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }

        } else{

          this.storeScreen.variants_screen_type[0].task_bufferspi.splice(this.storeScreen.currentLineIdInObjectScreen, 1);

          this.changeLine({

            task: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task,
            task_command: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task_command,
            tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tech_comment || null,
            path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].path || null,
            OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].OpenCV_device_id || null,
            target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].target_text || null,
            tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tap_target_text || null,
            screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].screenshot_cropping || null,
          });

          for (let item = this.storeScreen.currentLineIdInObjectScreen; item < this.storeScreen.variants_screen_type[0].task_bufferspi.length; item++) {
            this.storeScreen.variants_screen_type[0].task_bufferspi[item].line_id--;
          }

          for (let object = this.storeScreen.numberOfObjectInList + 1; object < this.store.task_tesseractspi.length; object++) {
            if (this.store.task_tesseractspi[object].type_json_object === 'json static object') {
              for (let item = 0; item< this.store.task_tesseractspi[object].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].task_bufferspi[item].line_id--;
              }
            } else {
              for (let item = 0; item< this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi.length; item++) {
                this.store.task_tesseractspi[object].variants_screen_type[0].task_bufferspi[item].line_id--;
              }
            }
          }
        }
      }
    },
    ...mapWritableState(useLineId,['line_id','tech_comment','task',
      'task_command','path','OpenCV_device_id','screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId,{changeLine:'$patch'}),
    ...mapWritableState(useStaticJson,['currentLineIdInObject']),
    ...mapActions(useStaticJson,{changeCountStatic: '$patch'}),
    ...mapWritableState(useScreenJson,['currentLineIdInObjectScreen']),
    ...mapActions(useScreenJson, {changeCountScreen: '$patch'}),

    previewTask(){

      this.showTechCommentArea = false;

      if (this.typeOfJsonObject === 'json static object'){

        this.storeStatic.decrement();

        this.storeLineId.decrement();

        this.changeLine({
          task: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task,
        task_command: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task_command,
        tech_comment: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].tech_comment || null,
      });

      }else{

        this.storeScreen.decrementScreen();

        this.storeLineId.decrement();

        this.changeLine({
          task: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task,
          task_command: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task_command,
          tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tech_comment || null,
          path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].path || null,
          OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].OpenCV_device_id || null,
          target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].target_text || null,
          tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tap_target_text || null,
          screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].screenshot_cropping || null,
        });

        if (this.storeLineId.OpenCV_device_id !== null){
          navigateTo('/OptionScreenJsonScreen');
        }
        else{
          navigateTo('/ScreenJsonScreen');
        }
      }
    },
    ...mapWritableState(useLineId,['line_id','tech_comment','task',
      'task_command','path','OpenCV_device_id','screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId,{changeLine:'$patch'}),
    ...mapWritableState(useStaticJson,['currentLineIdInObject']),
    ...mapActions(useStaticJson,{changeCountStatic: '$patch'}),
    ...mapWritableState(useScreenJson,['currentLineIdInObjectScreen']),
    ...mapActions(useScreenJson, {changeCountScreen: '$patch'}),

    nextTask(){

      this.showTechCommentArea = false;

      if (this.typeOfJsonObject === 'json static object'){

          this.storeStatic.increment();

        this.storeLineId.increment();

        this.changeLine({
          task: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task || null,
          task_command: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].task_command || null,
          tech_comment: this.storeStatic.task_bufferspi[this.storeStatic.currentLineIdInObject].tech_comment || null,
        });


      }else{

          this.storeScreen.incrementScreen();

        this.storeLineId.increment();

            this.changeLine({
          task: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task || null,
          task_command: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].task_command || null,
          tech_comment: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tech_comment || null,
          path: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].path || null,
          OpenCV_device_id: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].OpenCV_device_id || null,
          target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].target_text || null,
          tap_target_text: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].tap_target_text || null,
          screenshot_cropping: this.storeScreen.variants_screen_type[0].task_bufferspi[this.storeScreen.currentLineIdInObjectScreen].screenshot_cropping || null,
        });

        if (this.storeLineId.OpenCV_device_id !== null){
          navigateTo('/OptionScreenJsonScreen');
        }
        else{
          navigateTo('/ScreenJsonScreen');
        }

      }
    },
  }
}
</script>
