<template>
  <div>
    <v-container class="listObject">
      <v-card class="JsonObject">
        <div v-if="typeJsonObject === 'json screen object'">
          <NuxtLink to="/CheckTextScreenJsonScreen"><v-card-title @click="saveVariant">{{typeJsonObject}}</v-card-title></NuxtLink>
        </div>
        <div v-else>
        <v-card-title>{{typeJsonObject}}</v-card-title>
        </div>
        <v-card-subtitle>{{screenType}}</v-card-subtitle>
            <v-col>
              <div v-if="typeJsonObject === 'json screen object'">
              <div v-for="(item,index) in store.taskTesseractspi[currentObject-1].variants_screen_type[0].task_bufferspi">
                <div v-if="item.task === 'check'">
                  <NuxtLink to="/OptionScreenJsonScreen"><v-btn @click="handlerScreen(index)">
                    {{'line_id '+item.line_id}}</v-btn></NuxtLink>
                </div>
                <div v-else-if="typeJsonObject === 'json screen object'">
                  <NuxtLink to="/ScreenJsonScreen"><v-btn @click="handlerScreen(index)">
                    {{'line_id '+item.line_id}}</v-btn></NuxtLink>
                </div>
              </div>
              </div>
              <div v-else>
                <div v-for="(item,index) in store.taskTesseractspi[currentObject-1].task_bufferspi">
                <div>
                  <NuxtLink to="/StaticJsonScreen"><v-btn @click="handlerStatic(index)">
                    {{'line_id '+item.line_id}}</v-btn></NuxtLink>
                </div>
            </div>
              </div>
            </v-col>
        <div v-if="currentObject!==1">
        <v-card-actions>json object {{currentObject-1}}</v-card-actions>
        </div>
        <div v-else>
          <v-card-actions>this is the first object</v-card-actions>
        </div>
        </v-card>
    </v-container>

  </div>
</template>

<script>

import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {mapActions, mapWritableState} from "pinia";
import {useLineId} from "~/stores/LineIdObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {useSaveScenario} from "~/stores/Scenario.js";

export default {
  name: "ListLineIdObject",
  props: {
    screenType: String,
    typeJsonObject: String,
    inputArray: Array,
    currentObject: Number,
  },
  data() {
    return {
      lineNum: 5,
    }
  },
  setup() {
    const store = useSaveScenario();
    const storeStatic = useStaticJson();
    const storeScreen = useScreenJson();
    const storeLineId = useLineId();
    const storeVariants = useVariantsScreenType();
    return {store, storeStatic, storeScreen, storeLineId, storeVariants}
  },
  methods: {
    handlerScreen(index) {
      this.showLineId(index);
        this.saveNumberOfObjectScreen();

    },
    handlerStatic(index) {
      this.showLineId(index);
        this.saveNumberOfObjectStatic();
    },
  showLineId(index) {
    sessionStorage.setItem('chooseLine', String(index));  //TODO change this solution (without sessionStorage)
  },
  ...mapWritableState(useLineId, ['lineId', 'task', 'tech_comment', "task_command"]),
    ...mapActions(useLineId, {saveStaticLine:'$patch'}),
  ...mapWritableState(useStaticJson, ['screen_type', 'task_bufferspi', 'currentLineIdInObject','numberOfObjectInList']), //TODO work with nested objects
...mapActions(useStaticJson, {saveStatic:'$patch'}),
  saveNumberOfObjectStatic() {
    this.saveStaticLine({
      lineId: Number(sessionStorage.getItem('chooseLine')) + this.inputArray[0].line_id,
      task: this.inputArray[Number(sessionStorage.getItem('chooseLine'))].task,
      task_command: this.inputArray[Number(sessionStorage.getItem('chooseLine'))].task_command,
      tech_comment: this.inputArray[Number(sessionStorage.getItem('chooseLine'))].tech_comment || "",
    });
    this.saveStatic({
      screen_type: this.screenType,
      task_bufferspi: this.inputArray,
      currentLineIdInObject: Number(sessionStorage.getItem('chooseLine')),
      numberOfObjectInList: this.currentObject-1
    });
  },
    ...mapWritableState(useLineId, ['lineId', 'task', 'tech_comment', "task_command",'path',"OpenCV_device_id",'target_text','tap_target_text','screenshot_cropping']),
    ...mapActions(useLineId, {saveScreenLine:'$patch'}),
  ...mapWritableState(useScreenJson, ['screen_type', 'variants_screen_type', 'currentLineIdInObject','numberOfObjectInList']), //TODO work with nested objects
  ...mapActions(useScreenJson, {saveScreen:'$patch'}),
  ...mapWritableState(useVariantsScreenType, ['check_text', 'check_text_button', 'task_bufferspi_screen']), //TODO work with nested objects
  ...mapActions(useVariantsScreenType, {saveVariants:'$patch'}),
  saveNumberOfObjectScreen() {
    this.saveScreenLine({
      lineId: Number(sessionStorage.getItem('chooseLine')) + this.inputArray[0].task_bufferspi[0].line_id,
      task: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].task,
      task_command: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].task_command,
      path: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].path || "",
      OpenCV_device_id: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].OpenCV_device_id || "",
      target_text: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].target_text || "",
      tap_target_text: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].tap_target_text || "",
      tech_comment: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].tech_comment || "",
      screenshot_cropping: this.inputArray[0].task_bufferspi[Number(sessionStorage.getItem('chooseLine'))].screenshot_cropping || "",
    });
    let checkTextList = [];
    let checkTextArray = Object.assign({},this.inputArray[0]);
    delete checkTextArray.task_bufferspi;
    delete checkTextArray.check_text_button;
    for (let item in Object.values(checkTextArray)){
      checkTextList.push(item);
    }
    this.saveVariants({
      check_text: checkTextList,
      check_text_button: this.inputArray[0].check_text_button,
      task_bufferspi_screen: this.inputArray[0].task_bufferspi
    });
    this.saveScreen({
      screen_type: this.screenType,
      variants_screen_type: this.storeScreen.variants_screen_type.push({"check_text":checkTextList,"check_text_button":this.inputArray[0].check_text_button,
        "task_bufferspi": this.inputArray[0].task_bufferspi}),
      currentLineIdInObject: Number(sessionStorage.getItem('chooseLine')),
      numberOfObjectInList: this.currentObject-1
    });
  },
    saveVariant() {
      this.saveScreenLine({
        lineId: this.inputArray[0].line_id,
        task: this.inputArray[0].task_bufferspi[0].task,
        task_command: this.inputArray[0].task_bufferspi[0].task_command,
        path: this.inputArray[0].task_bufferspi[0].path || "",
        OpenCV_device_id: this.inputArray[0].task_bufferspi[0].OpenCV_device_id || "",
        target_text: this.inputArray[0].task_bufferspi[0].target_text || "",
        tap_target_text: this.inputArray[0].task_bufferspi[0].tap_target_text || "",
        tech_comment: this.inputArray[0].task_bufferspi[0].tech_comment || "",
        screenshot_cropping: this.inputArray[0].task_bufferspi[0].screenshot_cropping || "",
      });
      let checkTextList = [];
      let checkTextArray = Object.assign({},this.inputArray[0]);
      delete checkTextArray.task_bufferspi;
      delete checkTextArray.check_text_button;
      for (let item in Object.values(checkTextArray)){
        checkTextList.push(item);
      }
      this.saveVariants({
        check_text: checkTextList,
        check_text_button: this.inputArray[0].check_text_button,
        task_bufferspi_screen: this.inputArray[0].task_bufferspi
      });
      this.saveScreen({
        screen_type: this.screenType,
        variants_screen_type: this.storeScreen.variants_screen_type.push({"check_text":checkTextList,"check_text_button":this.inputArray[0].check_text_button,
          "task_bufferspi": this.inputArray[0].task_bufferspi}),
        currentLineIdInObject: 0,
        numberOfObjectInList: this.currentObject-1
      });
    }
    },
}
</script>
