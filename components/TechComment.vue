<template>
  <v-col>
      <v-row>
        <v-textarea name="" v-model="techComment"  cols="30" rows="3"></v-textarea>
      </v-row>
    <v-row>
      <v-btn @click="saveTechComment">Сохранить</v-btn>
    </v-row>
  </v-col>
</template>

<script>
import {useLineId} from "~/stores/LineIdObject.js";
import {mapActions, mapWritableState} from "pinia";
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {useSaveScenario} from "~/stores/Scenario.js";

export default{
  name:"TechComment",
  data(){
    return{
      techComment: this.storeLineId.tech_comment,
    }
  },
  props:{
    typeOfJsonObject: String
  },
  setup(){
    const storeLineId = useLineId();
    const storeStatic = useStaticJson();
    const storeScreen = useScreenJson();
    const storeVariants = useVariantsScreenType();
    const store = useSaveScenario();
    return{store, storeStatic, storeScreen, storeVariants, storeLineId}
  },
  methods:{
    ...mapWritableState(useLineId,["tech_comment"]),
    ...mapActions(useLineId,{changeLineId:'$patch'}),
    ...mapWritableState(useStaticJson, ['task_bufferspi']),
    ...mapActions(useStaticJson, {changeStatic:'$patch'}),
    ...mapWritableState(useVariantsScreenType,['task_bufferspi_screen']),
    ...mapActions(useVariantsScreenType,{changeVariants:'$patch'}),
    ...mapWritableState(useScreenJson,['variants_screen_type']),
    ...mapActions(useScreenJson,{changeScreen:'$patch'}),
    ...mapWritableState(useSaveScenario, ['task_tesseractspi']),
    ...mapActions(useSaveScenario, {changeScenario: '$patch'}),
    saveTechComment(){

      let buffer_task_bufferspi = null;
      let buffer_variants_screen_type = null;
      let buffer_task_tesseractspi = null;

      console.log(this.techComment)

      this.changeLineId({
        tech_comment: this.techComment
      });

      if (this.typeOfJsonObject === 'json static object'){

        buffer_task_bufferspi = JSON.parse(JSON.stringify(this.storeStatic.task_bufferspi));

       buffer_task_bufferspi.splice(this.storeStatic.currentLineIdInObject, 1, {line_id: this.storeLineId.lineId,
       task: this.storeLineId.task, task_command: this.storeLineId.task_command,
       tech_comment: this.storeLineId.tech_comment});
       this.changeStatic({
         task_bufferspi: buffer_task_bufferspi,
       });
       buffer_task_tesseractspi = JSON.parse(JSON.stringify(this.store.task_tesseractspi));
       buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{ type_json_object: this.storeStatic.type_json_object,
         screen_type: this.storeStatic.screen_type,
         task_bufferspi: this.storeStatic.task_bufferspi,});
       this.changeScenario({
         task_tesseractspi: buffer_task_tesseractspi,
       });
      } else{

        buffer_task_bufferspi = JSON.parse(JSON.stringify(this.storeVariants.task_bufferspi_screen));

        buffer_task_bufferspi.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {line_id: this.storeLineId.lineId,
          task: this.storeLineId.task, task_command: this.storeLineId.task_command,
          tech_comment: this.storeLineId.tech_comment,
          path: this.storeLineId.path,
          OpenCV_device_id: this.storeLineId.OpenCV_device_id,
          count_repeat: this.storeLineId.count_repeat,
          screenshot_cropping: this.storeLineId.screenshot_cropping,
          target_text: this.storeLineId.target_text,
          tap_target_text: this.storeLineId.tap_target_text
        });

        this.changeVariants({
          task_bufferspi_screen: buffer_task_bufferspi,
        });

        console.log(this.storeVariants.task_bufferspi_screen)

        buffer_variants_screen_type = JSON.parse(JSON.stringify(this.storeScreen.variants_screen_type));

        buffer_variants_screen_type.splice(0,1,{check_text: this.storeVariants.check_text,
            check_text_button: this.storeVariants.check_text_button,
            task_bufferspi: this.storeVariants.task_bufferspi_screen});

        this.changeScreen({
          variants_screen_type: buffer_variants_screen_type,
        });

        buffer_task_tesseractspi = JSON.parse(JSON.stringify(this.store.task_tesseractspi));

        buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList,1,{ type_json_object: this.storeScreen.type_json_object,
          screen_type: this.storeScreen.screen_type,
          variants_screen_type: this.storeScreen.variants_screen_type});

        this.changeScenario({
          task_tesseractspi: buffer_task_tesseractspi,
        });
      }
    }
  }
}
</script>
