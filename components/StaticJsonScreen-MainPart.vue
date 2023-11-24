<template>
  <v-col class="main_part_static_screen">
    <div v-if="storeStatic.currentLineIdInObject === 0">
      <v-row class="buttonBar_static_screen">
        <div v-if='storeStatic.screen_type === "otg"'>
    <v-col class="first_level_columns_static_screen">
      <v-btn id="button_OTG" style="outline: 3px solid #00FF00" @click="changedOnOTG">Add OTG</v-btn>
    </v-col>
        </div>
        <div v-else>
          <v-col class="first_level_columns_static_screen">
            <v-btn id="button_OTG" @click="changedOnOTG">Add OTG</v-btn>
          </v-col>
        </div>
        <div v-if='storeStatic.screen_type === "adb"'>
        <v-col class="first_level_columns_static_screen">
      <v-btn id="button_ADB" style="outline: 3px solid #00FF00" @click="changedOnADB">Add ADB</v-btn>
    </v-col>
        </div>
        <div v-else>
          <v-col class="first_level_columns_static_screen">
            <v-btn id="button_ADB" @click="changedOnADB">Add ADB</v-btn>
          </v-col>
        </div>
    <v-col class="first_level_columns_static_screen">
      <v-btn id="button_3sec" :disabled="true" @click = "changedOn3Sec">Paused 3 sec</v-btn>
    </v-col>
    <v-col class="first_level_columns_static_screen">
      <v-btn id="button_5sec" :disabled="true" @click = "changedOn5Sec">Paused 5 sec</v-btn>
    </v-col>
    <v-col class="first_level_columns_static_screen">
      <v-btn id="button_manual" :disabled="true" @click="isManualPressed=!isManualPressed">Add manual paused</v-btn>
    </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row class="buttonBar_static_screen">
      <v-col class="first_level_columns_static_screen">
        <v-btn :disabled="true" id="button_OTG" @click="changedOnOTG">Add OTG</v-btn>
      </v-col>
      <v-col class="first_level_columns_static_screen">
        <v-btn :disabled="true" id="button_ADB" @click="changedOnADB">Add ADB</v-btn>
      </v-col>
        <div v-if='storeLine.task_command === "Pause 3 sec"'>
        <v-col class="first_level_columns_static_screen">
        <v-btn id="button_3sec" style="outline: 3px solid #00FF00" @click = "changedOn3Sec">Paused 3 sec</v-btn>
      </v-col>
        </div>
        <div v-else>
          <v-col class="first_level_columns_static_screen">
            <v-btn id="button_3sec" @click = "changedOn3Sec">Paused 3 sec</v-btn>
          </v-col>
        </div>
        <div v-if='storeLine.task_command === "Pause 5 sec"'>
      <v-col class="first_level_columns_static_screen">
        <v-btn id="button_5sec" style="outline: 3px solid #00FF00" @click = "changedOn5Sec">Paused 5 sec</v-btn>
      </v-col>
        </div>
        <div v-else>
          <v-col class="first_level_columns_static_screen">
            <v-btn id="button_5sec" @click = "changedOn5Sec">Paused 5 sec</v-btn>
          </v-col>
        </div>
        <div v-if='storeLine.task_command !== "Pause 5 sec" && storeLine.task_command !== "Pause 3 sec" &&
storeLine.task === "paused"'>
      <v-col class="first_level_columns_static_screen">
        <v-btn id="button_manual" style="outline: 3px solid #00FF00" @click="clickManualPausedButton">Add manual paused</v-btn>
      </v-col>
        </div>
        <div v-else>
          <v-col class="first_level_columns_static_screen">
            <v-btn id="button_manual" @click="clickManualPausedButton">Add manual paused</v-btn>
          </v-col>
        </div>
      </v-row>
    </div>
  <v-row class="second_level_static_screen">
    <v-col class="second_level_columns_static_screen">
      <v-row>
        <h5>Текущий json объект</h5>
      </v-row>
      <v-row>
        <v-btn :disabled="true">{{storeStatic.screen_type}}</v-btn>
      </v-row>
    </v-col>
    <v-col class="second_level_columns_static_screen">
      <v-row>
        <h5>Изображение</h5>
      </v-row>
      <v-row>
        <v-btn :disabled="true">{{screenName}}</v-btn>
      </v-row>
    </v-col>
    <v-col class="second_level_columns_static_screen">
      <v-btn @click="$refs.inputUpload.click()">Загрузить изображение</v-btn>
      <input v-show="false" ref="inputUpload" type="file" accept = "image/*" @change="loadImage" />
    </v-col>
  </v-row>
  <v-row class="third_level_static_screen">
    <v-col class="third_level_columns_static_screen">
      <v-container id="image_container">
        <div v-if="storeImage.dataURL === ''">
          <img id="image" alt="">
        </div>
        <div v-else>
          <img id="image" :src="storeImage.dataURL" alt="">
        </div>
      </v-container>
    </v-col>
    <v-col class="third_level_columns_static_screen">
      <div v-if="isManualPressed">
        <v-row>
          <v-text-field label="Укажите количество секунд" variant="underlined" @change="changedOnManualSec" v-model="context"></v-text-field>
        </v-row>
      </div>
      <v-row class="task_command_view_static_screen">
        <v-col>
          <vue-json-pretty :path="'res'" :data="getPreviewLineId"></vue-json-pretty>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row class="fourth_level_static_screen">
    <v-col class="fourth_level_columns_static_screen">
      <NuxtLink to="/GeneralJsonScreen"><v-btn :disabled='storeLine.task === ""'>Конец текущего объекта</v-btn></NuxtLink>
    </v-col>
    <v-col class="fourth_level_columns_static_screen">
      <v-btn>Вернуться на шаг назад</v-btn>
    </v-col>
    <v-col class="fourth_level_columns_static_screen">
      <NuxtLink to="/ChoiceJsonObjectScreen"><v-btn :disabled="true">Создать вложенный объект</v-btn></NuxtLink>
    </v-col>
  </v-row>
  </v-col>
</template>

<script>
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {mapWritableState, mapActions} from "pinia";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useImageState} from "~/stores/ImageObject.js";
import {readImageIntoMemory} from "~/stores/readImageIntoMemory.js";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default{
  name:"MainStaticJsonScreen",
  components: {
    VueJsonPretty,
  },
  data(){
    return{
      isManualPressed:false,
      screenName:this.storeImage.nameFile,
      context: null,
      buffer_task_tesseractspi: JSON.parse(JSON.stringify(this.store.task_tesseractspi)),
      buffer_static_task_bufferspi: JSON.parse(JSON.stringify(this.storeStatic.task_bufferspi)),
    }
  },
  computed:{
    getManualPaused(){
      return this.context
    },
    getPreviewLineId(){
      return JSON.parse(this.storeLine.getLineId)
    }
  },
  setup(){
    const store = useSaveScenario();
    const storeStatic = useStaticJson();
    const storeLine = useLineId();
    const storeImage = useImageState();
    return {store, storeStatic, storeLine, storeImage}
  },
  methods:{
    ...mapWritableState(useLineId,['lineId','task','task_command','tech_comment','path','OpenCV_device_id','count_repeat',
      'screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId, {changeTaskCommand:'$patch'}),
    ...mapWritableState(useStaticJson,['task_bufferspi','screen_type']),
    ...mapActions(useStaticJson, {changeLineInStatic:'$patch'}),
    ...mapWritableState(useSaveScenario,['task_tesseractspi']),
    ...mapActions(useSaveScenario, {changeLineInScenario:'$patch'}),

    changedOnOTG(){
      const elementOTG = document.getElementById('button_OTG');
      const elementADB = document.getElementById('button_ADB');
      const element3Sec = document.getElementById('button_3sec');
      const element5Sec = document.getElementById('button_5sec');
      const elementManual = document.getElementById('button_manual');

      elementOTG.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementADB.setAttribute('style', '');
      element3Sec.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isManualPressed=false;

      this.context = null;

      this.changeTaskCommand({
          task: "change",
          task_command: "change сonnecting OTG",
          path: null,
          OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
      });

      this.buffer_static_task_bufferspi.splice(this.storeStatic.currentLineIdInObject,1,
          {line_id: this.storeLine.lineId, task: this.storeLine.task, task_command: this.storeLine.task_command,
            tech_comment: this.storeLine.tech_comment});


      this.changeLineInStatic({
        task_bufferspi: this.buffer_static_task_bufferspi,
        screen_type: "otg"
      });

      this.buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{
        type_json_object: this.storeStatic.type_json_object, screen_type: this.storeStatic.screen_type,
        task_bufferspi: this.storeStatic.task_bufferspi});

      this.changeLineInScenario({
        task_tesseractspi: this.buffer_task_tesseractspi
      });

    },
    changedOnADB(){
      const elementOTG = document.getElementById('button_OTG');
      const elementADB = document.getElementById('button_ADB');
      const element3Sec = document.getElementById('button_3sec');
      const element5Sec = document.getElementById('button_5sec');
      const elementManual = document.getElementById('button_manual');

      elementOTG.setAttribute('style', '');
      elementADB.setAttribute('style', 'outline: 3px solid #00FF00;');
      element3Sec.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isManualPressed=false;

      this.context = null;

      this.changeTaskCommand({
        task: "change",
        task_command: "change сonnecting ADB",
        path: null,
        OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
        target_text: null,
        tap_target_text: null
      });

      this.buffer_static_task_bufferspi.splice(this.storeStatic.currentLineIdInObject,1,
          {line_id: this.storeLine.lineId, task: this.storeLine.task, task_command: this.storeLine.task_command,
            tech_comment: this.storeLine.tech_comment});

      this.changeLineInStatic({
        task_bufferspi:  this.buffer_static_task_bufferspi,
        screen_type: "adb"
      });

      this.buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{
      type_json_object: this.storeStatic.type_json_object, screen_type: this.storeStatic.screen_type,
          task_bufferspi: this.storeStatic.task_bufferspi});

          this.changeLineInScenario({
            task_tesseractspi: this.buffer_task_tesseractspi
          });

    },
    changedOn3Sec(){
      const elementOTG = document.getElementById('button_OTG');
      const elementADB = document.getElementById('button_ADB');
      const element3Sec = document.getElementById('button_3sec');
      const element5Sec = document.getElementById('button_5sec');
      const elementManual = document.getElementById('button_manual');

      elementOTG.setAttribute('style', '');
      elementADB.setAttribute('style', '');
      element3Sec.setAttribute('style', 'outline: 3px solid #00FF00;');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isManualPressed=false;

      this.context = null;

      this.changeTaskCommand({
        task: "paused",
        task_command: "Pause 3 sec",
        path: null,
        OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
        target_text: null,
        tap_target_text: null
      });

      this.buffer_static_task_bufferspi.splice(this.storeStatic.currentLineIdInObject,1,
            {line_id: this.storeLine.lineId, task: this.storeLine.task,
              task_command: this.storeLine.task_command, tech_comment: this.storeLine.tech_comment});

      this.changeLineInStatic({
        task_bufferspi: this.buffer_static_task_bufferspi,
      });

      this.buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{
        type_json_object: this.storeStatic.type_json_object, screen_type: this.storeStatic.screen_type,
        task_bufferspi: this.storeStatic.task_bufferspi});

      this.changeLineInScenario({
        task_tesseractspi: this.buffer_task_tesseractspi
      });
    },
    changedOn5Sec(){
      const elementOTG = document.getElementById('button_OTG');
      const elementADB = document.getElementById('button_ADB');
      const element3Sec = document.getElementById('button_3sec');
      const element5Sec = document.getElementById('button_5sec');
      const elementManual = document.getElementById('button_manual');

      elementOTG.setAttribute('style', '');
      elementADB.setAttribute('style', '');
      element3Sec.setAttribute('style', '');
      element5Sec.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementManual.setAttribute('style', '');

      this.isManualPressed=false;

      this.context = null;

      this.changeTaskCommand({
        task: "paused",
        task_command: "Pause 5 sec",
        path: null,
        OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
        target_text: null,
        tap_target_text: null
      });
      this.buffer_static_task_bufferspi.splice(this.storeStatic.currentLineIdInObject,1,
          {line_id: this.storeLine.lineId, task: this.storeLine.task,
            task_command: this.storeLine.task_command, tech_comment: this.storeLine.tech_comment});

      this.changeLineInStatic({
        task_bufferspi: this.buffer_static_task_bufferspi,
      });

      this.buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{
        type_json_object: this.storeStatic.type_json_object, screen_type: this.storeStatic.screen_type,
        task_bufferspi: this.storeStatic.task_bufferspi});

      this.changeLineInScenario({
        task_tesseractspi: this.buffer_task_tesseractspi
      });
    },

    checkManualParams(){
      if (isNaN(this.getManualPaused.trim())) {
        return true;
      }
      else if(this.getManualPaused.trim() === ""){
        return true;
      }
      return false;
    },

    changedOnManualSec(){

      if (!this.checkManualParams()) {

        const elementManual = document.getElementById('button_manual');
        elementManual.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "paused",
          task_command: "Pause " + this.getManualPaused + " sec",
          path: null,
          OpenCV_device_id: null,
          count_repeat: null,
          screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
        });
        this.buffer_static_task_bufferspi.splice(this.storeStatic.currentLineIdInObject,1,
            {line_id: this.storeLine.lineId, task: this.storeLine.task,
              task_command: this.storeLine.task_command, tech_comment: this.storeLine.tech_comment});

        this.changeLineInStatic({
          task_bufferspi: this.buffer_static_task_bufferspi,
        });

        this.buffer_task_tesseractspi.splice(this.storeStatic.numberOfObjectInList,1,{
          type_json_object: this.storeStatic.type_json_object, screen_type: this.storeStatic.screen_type,
          task_bufferspi: this.storeStatic.task_bufferspi});

        this.changeLineInScenario({
          task_tesseractspi: this.buffer_task_tesseractspi
        });
      }
      else{
        const elementManual = document.getElementById('button_manual');
        elementManual.setAttribute('style', 'background-color: red;');
      }
    },
    clickManualPausedButton(){
      const elementOTG = document.getElementById('button_OTG');
      const elementADB = document.getElementById('button_ADB');
      const element3Sec = document.getElementById('button_3sec');
      const element5Sec = document.getElementById('button_5sec');
      const elementManual = document.getElementById('button_manual');

      elementOTG.setAttribute('style', '');
      elementADB.setAttribute('style', '');
      element3Sec.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', 'outline: 3px solid #00FF00;');

      this.isManualPressed = true;
    },

    ...mapWritableState(useImageState,['dataURL','nameFile', 'multiplierPicture']),
    ...mapActions(useImageState,{saveImage: '$patch'}),

    async loadImage() {
      this.file = this.$refs.inputUpload.files[0];
      let elementImage = document.getElementById('image_container');

      this.screenName = this.file.name;
      let dataFromImage = null;
      const getLoad = async () => {
        dataFromImage = await readImageIntoMemory(this.file, elementImage).then(function (response) {
          document.getElementById("image").src = response.dataUrl;
          return response;
        });
      };
      await getLoad();

      this.saveImage({
        dataURL: dataFromImage.dataUrl,
        nameFile: this.file.name,
        multiplierPicture: dataFromImage.multiplierImage,
      });
    },
  }
}
</script>

<style lang="scss">
.main_part_static_screen{
  min-height: 70vh;
}
.buttonBar_static_screen{
  background-color:skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_static_screen{
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.third_level_static_screen{
  min-height: 50vh;
}
.fourth_level_static_screen{
  min-height: 10vh;
}
.first_level_columns_static_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_columns_static_screen .v-row{
  display: flex;
  align-items: self-start;
  justify-content: center;
}
.third_level_columns_static_screen .v-row{
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.third_level_columns_static_screen .task_command_view_static_screen{
  min-height: 40vh;
  min-width: 20vw;
  max-width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen {
  .third_level_columns_static_screen .v-container {
    min-height: 80vh;
    min-width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.fourth_level_columns_static_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>