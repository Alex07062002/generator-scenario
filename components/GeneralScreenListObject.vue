<template>
  <div>
    <v-container class="listObject">
      <v-card class="JsonObject">
        <div v-if="this.store.getTaskTesseractspi[this.currentObject-1].type_json_object === 'json screen object'">
          <NuxtLink to="/CheckTextScreenJsonScreen"><v-card-title @click="saveVariant">
            {{this.store.getTaskTesseractspi[this.currentObject-1].type_json_object}}</v-card-title></NuxtLink>
        </div>
        <div v-else>
        <v-card-title>{{this.store.getTaskTesseractspi[this.currentObject-1].type_json_object}}</v-card-title>
        </div>
        <v-card-subtitle>{{this.store.getTaskTesseractspi[this.currentObject-1].screen_type}}</v-card-subtitle>
            <v-col>
              <div v-if="this.store.getTaskTesseractspi[this.currentObject-1].type_json_object === 'json screen object'">
              <div v-for="(item,index) in store.getTaskTesseractspi[currentObject-1].variants_screen_type[0].task_bufferspi">
                <div v-if="item.task === 'check'">
                  <NuxtLink to="/OptionScreenJsonScreen"><v-btn @click="saveNumberOfObjectScreen(index)">
                    {{'line_id '+item.line_id}}</v-btn></NuxtLink>
                </div>
                <div v-else-if="this.store.getTaskTesseractspi[this.currentObject-1].type_json_object === 'json screen object'">
                  <NuxtLink to="/ScreenJsonScreen"><v-btn @click="saveNumberOfObjectScreen(index)">
                    {{'line_id '+item.line_id}}</v-btn></NuxtLink>
                </div>
              </div>
              </div>
              <div v-else>
                <div v-for="(item,index) in store.task_tesseractspi[currentObject-1].task_bufferspi">
                <div>
                  <NuxtLink to="/StaticJsonScreen"><v-btn @click="saveNumberOfObjectStatic(index)">
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
import {useCurrentObject} from "~/stores/CurrentObjectState.js";

export default {
  name: "ListLineIdObject",
  props: {
    currentObject: Number,
    type: String,
  },
  data() {
    return {
    }
  },
  setup() {
    const store = useSaveScenario();
    const storeStatic = useStaticJson();
    const storeScreen = useScreenJson();
    const storeLineId = useLineId();
    const storeVariants = useVariantsScreenType();
    const storeCurrentObject = useCurrentObject();
    return {store, storeStatic, storeScreen, storeLineId, storeVariants, storeCurrentObject}
  },
  methods: {
  ...mapWritableState(useLineId, ['lineId', 'task', 'tech_comment', "task_command"]),
    ...mapActions(useLineId, {saveStaticLine:'$patch'}),
  ...mapWritableState(useStaticJson, ['screen_type', 'task_bufferspi', 'currentLineIdInObject','numberOfObjectInList']), //TODO work with nested objects
...mapActions(useStaticJson, {saveStatic:'$patch'}),
    ...mapWritableState(useSaveScenario,['task_tesseractspi']),
    ...mapActions(useSaveScenario,{saveNewCheckTextView:'$patch'}),
    ...mapWritableState(useCurrentObject,['currentObject']),
    ...mapActions(useCurrentObject, '$patch'),
    saveNumberOfObjectStatic(index) {
    this.saveStaticLine({
      lineId: index +
          this.store.getTaskTesseractspi[this.currentObject-1].task_bufferspi[0].line_id,
      task: this.store.getTaskTesseractspi[this.currentObject-1].task_bufferspi[index].task,
      task_command: this.store.getTaskTesseractspi[this.currentObject-1].task_bufferspi[index].task_command,
      tech_comment: this.store.getTaskTesseractspi[this.currentObject-1].task_bufferspi[index].tech_comment || null,
    });
    this.saveStatic({
      screen_type: this.store.getTaskTesseractspi[this.currentObject-1].screen_type,
      task_bufferspi: this.store.getTaskTesseractspi[this.currentObject-1].task_bufferspi,
      currentLineIdInObject: index,
      numberOfObjectInList: this.currentObject-1
    });

      if (this.type === 'current') {
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 2);
      }
      else{
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 1);
      }
    },

    ...mapWritableState(useLineId, ['lineId', 'task', 'tech_comment', "task_command",'path',"OpenCV_device_id",'count_repeat','target_text','tap_target_text','screenshot_cropping']),
    ...mapActions(useLineId, {saveScreenLine:'$patch'}),
  ...mapWritableState(useScreenJson, ['screen_type', 'variants_screen_type', 'currentLineIdInObjectScreen','numberOfObjectInList']), //TODO work with nested objects
  ...mapActions(useScreenJson, {saveScreen:'$patch'}),
  ...mapWritableState(useVariantsScreenType, ['check_text', 'check_text_button', 'task_bufferspi_screen']), //TODO work with nested objects
  ...mapActions(useVariantsScreenType, {saveVariantsStore:'$patch'}),
    ...mapWritableState(useCurrentObject,['currentObject']),
    ...mapActions(useCurrentObject, '$patch'),
    saveNumberOfObjectScreen(index) {
    this.saveScreenLine({
      lineId: index +
          this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].line_id,
      task: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].task,
      task_command: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].task_command,
      path: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].path || null,
      OpenCV_device_id: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].OpenCV_device_id || null,
      count_repeat: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].count_repeat || null,
        target_text: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].target_text || null,
      tap_target_text: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].tap_target_text || null,
      tech_comment:this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].tech_comment || null,
      screenshot_cropping: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[index].screenshot_cropping || null,
    });
    let checkTextObj = [];

    if (this.storeScreen.screen_type === "") {
     let checkTextArray = Object.assign({}, this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0]);
      delete checkTextArray.task_bufferspi;
      delete checkTextArray.check_text_button;

      for (let i = 0; i < Object.values(checkTextArray).length; i++) {
        if (i === 0) {
          checkTextObj.push({"name": "check_text", "value": Object.values(checkTextArray)[i]});
        } else {
          checkTextObj.push({"name": "check_text_" + i, "value": Object.values(checkTextArray)[i]});
        }
      }
    }
    else{
      if (typeof this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text === "string"){
        checkTextObj.push({
          "name": "check_text",
          "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text
        });
      } else {
        for (let i = 0; i < this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text.length; i++) {
          if (i === 0) {
            checkTextObj.push({
              "name": "check_text",
              "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text[i].value
            });
          } else {
            checkTextObj.push({
              "name": "check_text_" + i,
              "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text[i].value
            });
          }
        }
      }
    }

    this.saveVariantsStore({
      check_text: checkTextObj,
      check_text_button: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text_button,
      task_bufferspi_screen: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi
    });

    this.saveScreen({
      screen_type: this.store.getTaskTesseractspi[this.currentObject-1].screen_type,
      variants_screen_type: [{"check_text": checkTextObj,"check_text_button":
        this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text_button,
        "task_bufferspi": this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi}],
      currentLineIdInObjectScreen: index,
      numberOfObjectInList: this.currentObject-1
    });

      if (this.type === 'current') {
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 2);
      }
      else{
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 1);
      }
    },


    saveVariant() {
      this.saveScreenLine({
        lineId: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].line_id,
        task: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].task,
        task_command: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].task_command,
        path: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].path || null,
        OpenCV_device_id: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].OpenCV_device_id || null,
        count_repeat: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].count_repeat || null,
        target_text: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].target_text || null,
        tap_target_text: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].tap_target_text || null,
        tech_comment: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].tech_comment || null,
        screenshot_cropping: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi[0].screenshot_cropping || null,
      });
      let checkTextObj = [];

      if (this.storeScreen.screen_type === null) {
          let checkTextArray = Object.assign({}, this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0]);
          delete checkTextArray.task_bufferspi;
          delete checkTextArray.check_text_button;

          for (let i = 0; i < Object.values(checkTextArray).length; i++) {
            if (i === 0) {
              checkTextObj.push({"name": "check_text", "value": Object.values(checkTextArray)[i]});
            } else {
              checkTextObj.push({"name": "check_text_" + i, "value": Object.values(checkTextArray)[i]});
            }
          }
        }
        else{
          if (typeof this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text === "string"){
            checkTextObj.push({
              "name": "check_text",
              "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text
            });
          } else {
            for (let i = 0; i < this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text.length; i++) {
              if (i === 0) {
                checkTextObj.push({
                  "name": "check_text",
                  "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text[i].value
                });
              } else {
                checkTextObj.push({
                  "name": "check_text_" + i,
                  "value": this.store.getTaskTesseractspi[this.currentObject - 1].variants_screen_type[0].check_text[i].value
                });
              }
            }
          }
        }

      this.saveVariantsStore({
        check_text: checkTextObj,
        check_text_button: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text_button,
        task_bufferspi_screen: this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi
      });

      this.saveScreen({
        screen_type: this.store.getTaskTesseractspi[this.currentObject-1].screen_type,
        variants_screen_type: [{"check_text": checkTextObj,"check_text_button":this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].check_text_button,
          "task_bufferspi": this.store.getTaskTesseractspi[this.currentObject-1].variants_screen_type[0].task_bufferspi}],
        currentLineIdInObjectScreen: 0,
        numberOfObjectInList: this.currentObject-1
      });

      if (this.type === 'current') {
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 2);
      }
      else{
        this.storeCurrentObject.currentObjectNewValue(this.currentObject - 1);
      }
    },
    }
}
</script>
