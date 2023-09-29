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
            <v-row>
              <Logo/>
            </v-row>
            <v-row>
              <h5>{{storeName.getName}}</h5>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-row style="justify-content: center">
              <h3>Какой объект json создаём?</h3>
            </v-row>
            <v-row>
              <v-col>
              <div v-if="typeOfObject === 1">
                <v-btn class="button_choice_screen" color="blue" @click="choiceStaticObject">json static object</v-btn>
              </div>
              <div v-else>
                  <v-btn color="blue" @click="choiceStaticObject">json static object</v-btn>
              </div>
              </v-col>
              <v-col>
              <div v-if="typeOfObject === 2">
                <v-btn class="button_choice_screen" color="orange" @click="choiceScreenObject">json screen object</v-btn>
              </div>
              <div v-else>
                <v-btn color="orange" @click="choiceScreenObject">json screen object</v-btn>
              </div>
              </v-col>
            </v-row>
            <v-row style="justify-content: flex-end; align-items: flex-end; margin: 50px 0 0 0">
              <v-list-item><img @click="checkTypeJsonObjectPressed" :src="images['newImage']" alt="">
              </v-list-item>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import images from "~/static/images.js";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {mapWritableState,mapActions} from "pinia";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {useCurrentObject} from "~/stores/CurrentObjectState.js";

export default {
  name: "ChoiceJsonObjectScreen",
  components: [
    '~/components'
  ],
  methods: {
    checkTypeJsonObjectPressed() {
      if (this.typeOfObject === 1){
        let buffer_task_bufferspi = JSON.parse(JSON.stringify(this.storeStatic.task_bufferspi));

        if (this.store.task_tesseractspi.length === 0){
          this.changeLineId({
            lineId: 1,
          });
        }
        else if (this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].type_json_object === 'json screen object') {

          this.changeLineId({
            lineId: this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].variants_screen_type[0].task_bufferspi
                [this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].variants_screen_type[0].task_bufferspi.length - 1].line_id + 1
          });

        } else if (this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].type_json_object === 'json static object') {

          this.changeLineId({
            lineId: this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].task_bufferspi
                [this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].task_bufferspi.length - 1].line_id + 1
          });
        }
        buffer_task_bufferspi.push({"line_id": this.storeLineId.lineId, "task": this.storeLineId.task,
          "task_command": this.storeLineId.task_command, "tech_comment": this.storeLineId.tech_comment});

        this.newStaticObject({
          currentLineIdInObject: 0,
          numberOfObjectInList: this.buffer_scenario.length,
          task_bufferspi: buffer_task_bufferspi,
        });

        this.buffer_scenario.push({ 'type_json_object': this.storeStatic.type_json_object,
          'screen_type': this.storeStatic.screen_type,
          'task_bufferspi': this.storeStatic.task_bufferspi});

        this.addedNewObject({
          task_tesseractspi: this.buffer_scenario,
        });

        //this.storeCurrentObject.incrementCurrent();

        navigateTo("/StaticJsonScreen");
      }
      else if (this.typeOfObject === 2){

        let buffer_task_bufferspi = JSON.parse(JSON.stringify(this.storeVariants.task_bufferspi_screen));
        let buffer_variants_screen_type = JSON.parse(JSON.stringify(this.storeScreen.variants_screen_type));

        if (this.store.task_tesseractspi.length === 0){
          this.changeLineId({
            lineId: 1,
          });
        }
        else if (this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].type_json_object === 'json screen object') {
          this.changeLineId({
            lineId: this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].variants_screen_type[0].task_bufferspi
                [this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].variants_screen_type[0].task_bufferspi.length - 1].line_id + 1
          });
        } else if (this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].type_json_object === 'json static object') {
          this.changeLineId({
            lineId: this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].task_bufferspi
                [this.store.task_tesseractspi[this.store.task_tesseractspi.length - 1].task_bufferspi.length - 1].line_id + 1
          });
        }
        buffer_task_bufferspi.push({line_id: this.storeLineId.lineId,
          task: this.storeLineId.task,
          task_command: this.storeLineId.task_command,
          tech_comment: this.storeLineId.tech_comment,
          path: this.storeLineId.path,
          OpenCV_device_id: this.storeLineId.OpenCV_device_id,
          count_repeat: this.storeLineId.count_repeat,
          screenshot_cropping: this.storeLineId.screenshot_cropping,
          target_text: this.storeLineId.target_text,
          tap_target_text: this.storeLineId.tap_target_text });

        buffer_variants_screen_type.push({ 'check_text': this.storeVariants.check_text,
          'check_text_button': this.storeVariants.check_text_button,
          'task_bufferspi': this.storeVariants.task_bufferspi_screen});

        this.changeVariants({
          task_bufferspi_screen: buffer_task_bufferspi,
        });

        buffer_variants_screen_type.push({ 'check_text': this.storeVariants.check_text,
          'check_text_button': this.storeVariants.check_text_button,
          'task_bufferspi': this.storeVariants.task_bufferspi_screen});

        this.newScreenObject({
          currentLineIdInObject: 0,
          numberOfObjectInList: this.buffer_scenario.length,
          variants_screen_type: buffer_variants_screen_type,
        });
        this.buffer_scenario.push({ 'type_json_object': this.storeScreen.type_json_object,
          'screen_type': this.storeScreen.screen_type,
          'variants_screen_type': this.storeScreen.variants_screen_type});

        this.addedNewObject({
          task_tesseractspi: this.buffer_scenario,
        });

        //this.storeCurrentObject.incrementCurrent();

        navigateTo("/ScreenJsonScreen");
      }
    },
    ...mapWritableState(useLineId, ['lineId']),
    ...mapActions(useLineId, {changeLineId: '$patch'}),
    ...mapWritableState(useStaticJson, ["currentLineIdInObject",
      'numberOfObjectInList', 'task_bufferspi']),
    ...mapActions(useStaticJson, {newStaticObject: '$patch'}),
    ...mapWritableState(useSaveScenario, ['task_tesseractspi']),
    ...mapActions(useSaveScenario, {addedNewObject: '$patch'}),
    choiceStaticObject() {
      this.storeLineId.$reset();
      this.storeStatic.$reset();
      this.typeOfObject = 1;
    },

    ...mapWritableState(useLineId, ['lineId']),
    ...mapActions(useLineId, {changeLineId: '$patch'}),
    ...mapWritableState(useVariantsScreenType, ['task_bufferspi_screen']),
    ...mapActions(useVariantsScreenType, {changeVariants:'$patch'}),
    ...mapWritableState(useScreenJson, ["currentLineIdInObject",
      'numberOfObjectInList', 'variants_screen_type']),
    ...mapActions(useScreenJson, {newScreenObject: '$patch'}),
    choiceScreenObject() {
      this.storeLineId.$reset();
      this.storeVariants.$reset();
      this.storeScreen.$reset();
      this.typeOfObject = 2;
    }
  },
  data(){
    return{
      images,
      typeOfObject: 0, /** 0-no clicked, 1-static, 2-screen **/
      buffer_scenario: JSON.parse(JSON.stringify(this.store.task_tesseractspi)),
    }
  },
  setup(){
    const store = useSaveScenario();
    const storeName = useNameJsonFile();
    const storeLineId = useLineId();
    const storeScreen = useScreenJson();
    const storeStatic = useStaticJson();
    const storeVariants = useVariantsScreenType();
    const storeCurrentObject = useCurrentObject();
    return {store, storeName, storeLineId, storeScreen, storeStatic, storeVariants, storeCurrentObject}
  },
}
</script>

<style lang="scss">
.button_choice_screen{
  outline: 3px solid #00FF00;
  border-radius: 25px;
  margin: 10px 10px 10px 10px;
}
</style>