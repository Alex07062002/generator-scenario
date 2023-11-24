<template>
  <v-col>
  <v-row class="buttonBar_screen_screen">
    <div v-if='storeLine.task === "tap"'>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_Tap" style="outline: 3px solid #00FF00" @click="clickedButtonTap">Add tap</v-btn>
      </v-col>
    </div>
    <div v-else>
    <v-col class="first_level_columns_screen_screen">
      <v-btn id="button_Tap" @click="clickedButtonTap">Add tap</v-btn>
    </v-col>
    </div>
    <div v-if='storeLine.task === "swipe"'>
    <v-col class="first_level_columns_screen_screen">
      <v-btn id="button_Swipe" style="outline: 3px solid #00FF00" @click="clickedButtonSwipe">Add swipe</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_Swipe" @click="clickedButtonSwipe">Add swipe</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.task === "text" && !storeLine.task_command.includes("{task_command_path}")'>
    <v-col class="first_level_columns_screen_screen">
      <v-btn id="button_Text" style="outline: 3px solid #00FF00" @click="clickedButtonText">Input text</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_Text"  @click="clickedButtonText">Input text</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.task === "text" && storeLine.task_command.includes("{task_command_path}")'>
    <v-col class="first_level_columns_screen_screen">
      <v-btn id="button_Json" style="outline: 3px solid #00FF00" @click="clickedButtonJson">Local json</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_Json" @click="clickedButtonJson">Local json</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.task_command === "Pause 5 sec"'>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_5Sec" style="outline: 3px solid #00FF00" @click="clickedButton5Sec">Paused 5 sec</v-btn>
      </v-col>
    </div>
   <div v-else>
     <v-col class="first_level_columns_screen_screen">
       <v-btn id="button_5Sec" @click="clickedButton5Sec">Paused 5 sec</v-btn>
     </v-col>
   </div>
    <div v-if='storeLine.task_command !== "Pause 5 sec" && storeLine.task === "paused"'>
      <v-col class="first_level_columns_screen_screen">
        <v-btn id="button_Manual" style="outline: 3px solid #00FF00" @click="clickedButtonManual">Manual paused</v-btn>
      </v-col>
    </div>
    <div v-else>
    <v-col class="first_level_columns_screen_screen">
      <v-btn id="button_Manual" @click="clickedButtonManual">Manual paused</v-btn>
    </v-col>
    </div>
  </v-row>
<v-row class="second_level_screen_screen">
  <v-col class="second_level_columns_screen_screen">
    <v-row>
      <h5>Изображение</h5>
    </v-row>
    <v-row>
      <v-btn :disabled="true">{{screenName}}</v-btn>
    </v-row>
  </v-col>
  <v-col class="second_level_columns_screen_screen">
    <v-btn @click="$refs.inputUpload.click()">Загрузить изображение</v-btn>
    <input v-show="false" ref="inputUpload" type="file" accept = "image/*" @change="loadImage" />
  </v-col>
</v-row>
    <v-row class="third_level_screen_screen">
      <v-col class="third_level_columns_screen_screen">
        <v-container id="image_container">
          <div v-if="storeImage.dataURL === ''">
          <img id="image" alt="">
          </div>
          <div v-else>
            <img id="image" :src="storeImage.dataURL" alt="">
          </div>
        </v-container>
      </v-col>
      <v-col class="third_level_columns_screen_screen">
        <div v-if="isManualPressed">
          <v-row>
            <h5>Укажите количество секунд</h5>
            <v-text-field v-model="ManualPause" variant="underlined" @change="changedManualParams"></v-text-field>
          </v-row>
        </div>
        <div v-if="isTapPressed">
          <v-row>
            <h5>Координаты:</h5>
            <h5>X</h5><v-text-field variant="underlined" v-model="X"  @change="changedTapParams"></v-text-field>
            <h5>Y</h5><v-text-field v-model="Y" variant="underlined" @change="changedTapParams"></v-text-field>
          </v-row>
        </div>
        <div v-if="isSwipePressed">
          <v-row>
            <h5>Координаты:</h5>
            <h5>X1</h5><v-text-field variant="underlined" v-model="X1" @change="changedSwipeParams"></v-text-field>
            <h5>Y1</h5><v-text-field variant="underlined" v-model="Y1" @change="changedSwipeParams"></v-text-field>
            <h5>X2</h5><v-text-field variant="underlined" v-model="X2" @change="changedSwipeParams"></v-text-field>
            <h5>Y2</h5><v-text-field variant="underlined" v-model="Y2" @change="changedSwipeParams"></v-text-field>
          </v-row>
        </div>
        <div v-if="isInputTextPressed">
          <v-row>
            <h5>Добавить текст</h5><v-text-field variant="underlined" v-model="Text" @change="changedTextParams"></v-text-field>
          </v-row>
        </div>
        <div v-if="isLocalJsonPressed">
          <v-row>
            <v-btn>Укажите файл</v-btn><v-text-field variant="underlined" v-model="Json" @change="changedJsonParams"></v-text-field>
          </v-row>
        </div>
        <v-row  class="task_command_view_screen_screen">
          <v-col>
            <vue-json-pretty :path="'res'" :data="getPreviewLineId"></vue-json-pretty>
          </v-col>
        </v-row>
      </v-col>
</v-row>
    <v-row class="fourth_level_screen_screen">
      <v-col class="fourth_level_columns_screen_screen">
        <NuxtLink to="/GeneralJsonScreen"><v-btn :disabled='storeLine.task === ""'>Конец текущего объекта</v-btn></NuxtLink>
      </v-col>
      <v-col class="fourth_level_columns_screen_screen">
        <v-btn>Вернуться на шаг назад</v-btn>
      </v-col>
      <v-col class="fourth_level_columns_screen_screen">
        <NuxtLink to="/ChoiceJsonObjectScreen"><v-btn :disabled="true">Создать вложенный объект</v-btn></NuxtLink>
      </v-col>
    </v-row>
  </v-col>
</template>


<script>
import {useLineId} from "~/stores/LineIdObject.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {mapActions, mapWritableState} from "pinia";
import { reactive, watch } from 'vue'
import {useMouse, useMousePressed} from '@vueuse/core'
import {readImageIntoMemory} from "~/stores/readImageIntoMemory.js";
import {useImageState} from "~/stores/ImageObject.js";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';


export default {
  name: "ScreenJsonScreenMainPart",
  components: {
    VueJsonPretty,
  },
  /**
   * buffer_task_bufferspi_screen,
   * buffer_variants_screen_type,
   * buffer_task_tesseractspi - work with copy objects from state pinia
   *
   * @returns {{isSwipePressed: boolean, isLocalJsonPressed: boolean, buffer_task_bufferspi_screen: any,
   * buffer_variants_screen_type: any, isManualPressed: boolean, isInputTextPressed: boolean,
   * screenName: string, isTapPressed: boolean, buffer_task_tesseractspi: any}}
   */
  data() {
    return {
      isTapPressed: false,
      isSwipePressed: false,
      isInputTextPressed: false,
      isLocalJsonPressed: false,
      isManualPressed: false,
      X: "",
      Y: "",
      X1: "",
      Y1: "",
      X2: "",
      Y2: "",
      Text: "",
      Json: "",
      ManualPause: "",
      screenName: this.storeImage.nameFile,
      buffer_task_bufferspi_screen: JSON.parse(JSON.stringify(this.storeVariants.task_bufferspi_screen)),
      buffer_variants_screen_type: JSON.parse(JSON.stringify(this.storeScreen.variants_screen_type)),
      buffer_task_tesseractspi: JSON.parse(JSON.stringify(this.store.task_tesseractspi)),
      flagClickTap: false,
      flagClickSwipe: false,
    }
  },
  setup() {
    const store = useSaveScenario();
    const storeScreen = useScreenJson();
    const storeVariants = useVariantsScreenType();
    const storeLine = useLineId();
    const storeImage = useImageState();
    return {store, storeScreen, storeVariants, storeLine, storeImage}
  },
  /**
   * X,Y - textfields for add tap,
   * X1,Y1,X2,Y2 - textfields for add swipe,
   * Text - textfield for add input text,
   * Json - textfield for add json path,
   * ManualPause - textfield for add manual pause
   */
  computed: {
    getX() {
      return this.X;
    },
    getY() {
      return this.Y;
    },
    getX1() {
      return this.X1;
    },
    getY1() {
      return this.Y1;
    },
    getX2() {
      return this.X2;
    },
    getY2() {
      return this.Y2;
    },
    getManual() {
      return this.ManualPause;
    },
    getText() {
      return this.Text;
    },
    getJson() {
      return this.Json;
    },
    getPreviewLineId(){
      return JSON.parse(this.storeLine.getLineIdScreen)
    }
  },
  methods: {

    ...mapWritableState(useLineId, ['lineId', 'task', 'task_command', 'tech_comment', 'path', 'OpenCV_device_id', 'count_repeat',
      'screenshot_cropping', 'target_text', 'tap_target_text']),
    ...mapActions(useLineId, {changeTaskCommand: '$patch'}),
    ...mapWritableState(useVariantsScreenType, ['task_bufferspi_screen']),
    ...mapActions(useVariantsScreenType, {changeVariants: '$patch'}),
    ...mapWritableState(useScreenJson, ['variants_screen_type']),
    ...mapActions(useScreenJson, {changeLineInScreen: '$patch'}),
    ...mapWritableState(useSaveScenario, ['task_tesseractspi']),
    ...mapActions(useSaveScenario, {changeLineInScenario: '$patch'}),

      clickedButtonTap() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementSwipe.setAttribute('style', '');
      elementText.setAttribute('style', '');
      elementJson.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isTapPressed = true;
      this.isSwipePressed = false;
      this.isInputTextPressed = false;
      this.isLocalJsonPressed = false;
      this.isManualPressed = false;
      this.flagClickTap = true;
      this.flagClickSwipe = false;

      this.X1 = "";
      this.Y1 = "";
      this.X2 = "";
      this.Y2 = "";
      this.Text = "";
      this.Json = "";
      this.ManualPause = "";

       this.getCursorPositionTap();
    },

    /**
     * Use when write coordinates from keyboard
     * @returns {boolean}
     */
    checkTapParams() {
      if (isNaN(this.getX.trim()) || isNaN(this.getY.trim())) {
        return true;
      } else if (this.getX.trim() === "" || this.getY.trim() === "") {
        return true;
      }
      return false;
    },

    changedTapParams(){
      if (!this.checkTapParams()){
        this.changedTapParamsAuto();
      } else{
        const elementManual = document.getElementById('button_Tap');
        elementManual.setAttribute('style', 'background-color: red;');
      }
    },


    changedTapParamsAuto() {
        const elementTap = document.getElementById('button_Tap');
        elementTap.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "tap",
          task_command: "otg -s " + this.store.device_id + " shell input tap " + this.getX + " " + this.getY,
          tech_comment: null,
          path: null,
          OpenCV_device_id: null,
          count_repeat: null,
          screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
        });

        this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
          line_id: this.storeLine.lineId,
          task: this.storeLine.task,
          task_command: this.storeLine.task_command,
          tech_comment: this.storeLine.tech_comment,
          path: this.storeLine.path,
          OpenCV_device_id: this.storeLine.OpenCV_device_id,
          count_repeat: this.storeLine.count_repeat,
          screenshot_cropping: this.storeLine.screenshot_cropping,
          target_text: this.storeLine.target_text,
          tap_target_text: this.storeLine.tap_target_text
        });

        this.changeVariants({
          task_bufferspi_screen: this.buffer_task_bufferspi_screen
        });

        this.buffer_variants_screen_type.splice(0, 1, {
          check_text: this.storeVariants.check_text,
          check_text_button: this.storeVariants.check_text_button,
          task_bufferspi: this.storeVariants.task_bufferspi_screen
        });


        this.changeLineInScreen({
          variants_screen_type: this.buffer_variants_screen_type
        });

        this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
          type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
          variants_screen_type: this.storeScreen.variants_screen_type
        });

        this.changeLineInScenario({
          task_tesseractspi: this.buffer_task_tesseractspi
        });
      },

     clickedButtonSwipe() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', '');
      elementSwipe.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementText.setAttribute('style', '');
      elementJson.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isTapPressed = false;
      this.isSwipePressed = true;
      this.isInputTextPressed = false;
      this.isLocalJsonPressed = false;
      this.isManualPressed = false;
      this.flagClickTap = false;
       this.flagClickSwipe = true;

      this.X = "";
      this.Y = "";
      this.Text = "";
      this.Json = "";
      this.ManualPause = "";

       this.getCursorPositionSwipe();


    },

    checkSwipeParams() {
      if (isNaN(this.getX1.trim()) || isNaN(this.getY1.trim()) ||
          isNaN(this.getX2.trim()) || isNaN(this.getY2.trim())) {
        return true;
      } else if (this.getX1.trim() === "" || this.getY1.trim() === "" ||
          this.getX2.trim() === "" || this.getY2.trim() === "") {
        return true;
      }
      return false;
    },

    changedSwipeParams() {
       if (!this.checkSwipeParams()) {
       this.changedSwipeParamsAuto();
       }
       else{
        const elementSwipe = document.getElementById('button_Swipe');
        elementSwipe.setAttribute('style', 'background-color: red;');
       }
    },

      changedSwipeParamsAuto() {

        const elementSwipe = document.getElementById('button_Swipe');
        elementSwipe.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "swipe",
          task_command: "otg -s " + this.store.device_id + " shell input swipe " + this.getX1 + " " + this.getY1
              + " " + this.getX2 + " " + this.getY2,
          tech_comment: null,
          path: null,
          OpenCV_device_id: null,
          count_repeat: null,
          screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
        });

        this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
          line_id: this.storeLine.lineId,
          task: this.storeLine.task,
          task_command: this.storeLine.task_command,
          tech_comment: this.storeLine.tech_comment,
          path: this.storeLine.path,
          OpenCV_device_id: this.storeLine.OpenCV_device_id,
          count_repeat: this.storeLine.count_repeat,
          screenshot_cropping: this.storeLine.screenshot_cropping,
          target_text: this.storeLine.target_text,
          tap_target_text: this.storeLine.tap_target_text
        });

        this.changeVariants({
          task_bufferspi_screen: this.buffer_task_bufferspi_screen
        });

        this.buffer_variants_screen_type.splice(0, 1, {
          check_text: this.storeVariants.check_text,
          check_text_button: this.storeVariants.check_text_button,
          task_bufferspi: this.storeVariants.task_bufferspi_screen
        });


        this.changeLineInScreen({
          variants_screen_type: this.buffer_variants_screen_type
        });

        this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
          type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
          variants_screen_type: this.storeScreen.variants_screen_type
        });

        this.changeLineInScenario({
          task_tesseractspi: this.buffer_task_tesseractspi
        });
    },

    clickedButtonText() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', '');
      elementSwipe.setAttribute('style', '');
      elementText.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementJson.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isTapPressed = false;
      this.isSwipePressed = false;
      this.isInputTextPressed = true;
      this.isLocalJsonPressed = false;
      this.isManualPressed = false;
      this.flagClickTap = false;
      this.flagClickSwipe = false;


      this.X = "";
      this.Y = "";
      this.X1 = "";
      this.Y1 = "";
      this.X2 = "";
      this.Y2 = "";
      this.Json = "";
      this.ManualPause = "";

    },

    changedTextParams() {

      this.changeTaskCommand({
        task: "text",
        task_command: "otg -s " + this.store.device_id + " shell input text " + this.getText,
        tech_comment: null,
        path: null,
        OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
        target_text: null,
        tap_target_text: null
      });

      this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
        line_id: this.storeLine.lineId,
        task: this.storeLine.task,
        task_command: this.storeLine.task_command,
        tech_comment: this.storeLine.tech_comment,
        path: this.storeLine.path,
        OpenCV_device_id: this.storeLine.OpenCV_device_id,
        count_repeat: this.storeLine.count_repeat,
        screenshot_cropping: this.storeLine.screenshot_cropping,
        target_text: this.storeLine.target_text,
        tap_target_text: this.storeLine.tap_target_text
      });

      this.changeVariants({
        task_bufferspi_screen: this.buffer_task_bufferspi_screen
      });

      this.buffer_variants_screen_type.splice(0, 1, {
        check_text: this.storeVariants.check_text,
        check_text_button: this.storeVariants.check_text_button,
        task_bufferspi: this.storeVariants.task_bufferspi_screen
      });


      this.changeLineInScreen({
        variants_screen_type: this.buffer_variants_screen_type
      });

      this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
        type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
        variants_screen_type: this.storeScreen.variants_screen_type
      });

      this.changeLineInScenario({
        task_tesseractspi: this.buffer_task_tesseractspi
      });

    },

    clickedButtonJson() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', '');
      elementSwipe.setAttribute('style', '');
      elementText.setAttribute('style', '');
      elementJson.setAttribute('style', 'outline: 3px solid #00FF00;');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', '');

      this.isTapPressed = false;
      this.isSwipePressed = false;
      this.isInputTextPressed = false;
      this.isLocalJsonPressed = true;
      this.isManualPressed = false;
      this.flagClickTap = false;
      this.flagClickSwipe = false;

      this.X = "";
      this.Y = "";
      this.X1 = "";
      this.Y1 = "";
      this.X2 = "";
      this.Y2 = "";
      this.Text = "";
      this.ManualPause = "";

    },

    changedJsonParams() {

      if (this.getJson.includes(".json")) {

        const elementJson = document.getElementById('button_Json');
        elementJson.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "text",
          task_command: "otg -s " + this.store.device_id + " shell input text {task_command_path}",
          tech_comment: null,
          path: "scripts/" + this.getJson,
          OpenCV_device_id: null,
          count_repeat: null,
          screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
        });

        this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
          line_id: this.storeLine.lineId,
          task: this.storeLine.task,
          task_command: this.storeLine.task_command,
          tech_comment: this.storeLine.tech_comment,
          path: this.storeLine.path,
          OpenCV_device_id: this.storeLine.OpenCV_device_id,
          count_repeat: this.storeLine.count_repeat,
          screenshot_cropping: this.storeLine.screenshot_cropping,
          target_text: this.storeLine.target_text,
          tap_target_text: this.storeLine.tap_target_text
        });

        this.changeVariants({
          task_bufferspi_screen: this.buffer_task_bufferspi_screen
        });

        this.buffer_variants_screen_type.splice(0, 1, {
          check_text: this.storeVariants.check_text,
          check_text_button: this.storeVariants.check_text_button,
          task_bufferspi: this.storeVariants.task_bufferspi_screen
        });


        this.changeLineInScreen({
          variants_screen_type: this.buffer_variants_screen_type
        });

        this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
          type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
          variants_screen_type: this.storeScreen.variants_screen_type
        });

        this.changeLineInScenario({
          task_tesseractspi: this.buffer_task_tesseractspi
        });

      } else {
        const elementJson = document.getElementById('button_Json');
        elementJson.setAttribute('style', 'background-color: red;');
      }
    },

    clickedButton5Sec() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', '');
      elementSwipe.setAttribute('style', '');
      elementText.setAttribute('style', '');
      elementJson.setAttribute('style', '');
      element5Sec.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementManual.setAttribute('style', '');

      this.isTapPressed = false;
      this.isSwipePressed = false;
      this.isInputTextPressed = false;
      this.isLocalJsonPressed = false;
      this.isManualPressed = false;
      this.flagClickTap = false;
      this.flagClickSwipe = false;

      this.X = "";
      this.Y = "";
      this.X1 = "";
      this.Y1 = "";
      this.X2 = "";
      this.Y2 = "";
      this.Text = "";
      this.Json = "";
      this.ManualPause = "";

      this.changeTaskCommand({
        task: "paused",
        task_command: "Pause 5 sec",
        tech_comment: null,
        path: null,
        OpenCV_device_id: null,
        count_repeat: null,
        screenshot_cropping: null,
        target_text: null,
        tap_target_text: null
      });

      this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
        line_id: this.storeLine.lineId,
        task: this.storeLine.task,
        task_command: this.storeLine.task_command,
        tech_comment: this.storeLine.tech_comment,
        path: this.storeLine.path,
        OpenCV_device_id: this.storeLine.OpenCV_device_id,
        count_repeat: this.storeLine.count_repeat,
        screenshot_cropping: this.storeLine.screenshot_cropping,
        target_text: this.storeLine.target_text,
        tap_target_text: this.storeLine.tap_target_text
      });

      this.changeVariants({
        task_bufferspi_screen: this.buffer_task_bufferspi_screen
      });

      this.buffer_variants_screen_type.splice(0, 1, {
        check_text: this.storeVariants.check_text,
        check_text_button: this.storeVariants.check_text_button,
        task_bufferspi: this.storeVariants.task_bufferspi_screen
      });


      this.changeLineInScreen({
        variants_screen_type: this.buffer_variants_screen_type
      });

      this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
        type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
        variants_screen_type: this.storeScreen.variants_screen_type
      });

      this.changeLineInScenario({
        task_tesseractspi: this.buffer_task_tesseractspi
      });

    },
    clickedButtonManual() {

      const elementTap = document.getElementById('button_Tap');
      const elementSwipe = document.getElementById('button_Swipe');
      const elementText = document.getElementById('button_Text');
      const elementJson = document.getElementById('button_Json');
      const element5Sec = document.getElementById('button_5Sec');
      const elementManual = document.getElementById('button_Manual');

      elementTap.setAttribute('style', '');
      elementSwipe.setAttribute('style', '');
      elementText.setAttribute('style', '');
      elementJson.setAttribute('style', '');
      element5Sec.setAttribute('style', '');
      elementManual.setAttribute('style', 'outline: 3px solid #00FF00;');

      this.isTapPressed = false;
      this.isSwipePressed = false;
      this.isInputTextPressed = false;
      this.isLocalJsonPressed = false;
      this.isManualPressed = true;
      this.flagClickTap = false;
      this.flagClickSwipe = false;

      this.X = "";
      this.Y = "";
      this.X1 = "";
      this.Y1 = "";
      this.X2 = "";
      this.Y2 = "";
      this.Text = "";
      this.Json = "";

    },

    checkManualParams() {
      if (isNaN(this.getManual.trim())) {
        return true;
      } else if (this.getManual.trim() === "") {
        return true;
      }
      return false;
    },

    changedManualParams() {

      if (!this.checkManualParams()) {

        const elementManual = document.getElementById('button_Manual');
        elementManual.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "paused",
          task_command: "Pause " + this.getManual + " sec",
          tech_comment: null,
          path: null,
          OpenCV_device_id: null,
          count_repeat: null,
          screenshot_cropping: null,
          target_text: null,
          tap_target_text: null
        });

        this.buffer_task_bufferspi_screen.splice(this.storeScreen.currentLineIdInObjectScreen, 1, {
          line_id: this.storeLine.lineId,
          task: this.storeLine.task,
          task_command: this.storeLine.task_command,
          tech_comment: this.storeLine.tech_comment,
          path: this.storeLine.path,
          OpenCV_device_id: this.storeLine.OpenCV_device_id,
          count_repeat: this.storeLine.count_repeat,
          screenshot_cropping: this.storeLine.screenshot_cropping,
          target_text: this.storeLine.target_text,
          tap_target_text: this.storeLine.tap_target_text
        });

        this.changeVariants({
          task_bufferspi_screen: this.buffer_task_bufferspi_screen
        });

        this.buffer_variants_screen_type.splice(0, 1, {
          check_text: this.storeVariants.check_text,
          check_text_button: this.storeVariants.check_text_button,
          task_bufferspi: this.storeVariants.task_bufferspi_screen
        });


        this.changeLineInScreen({
          variants_screen_type: this.buffer_variants_screen_type
        });

        this.buffer_task_tesseractspi.splice(this.storeScreen.numberOfObjectInList, 1, {
          type_json_object: this.storeScreen.type_json_object, screen_type: this.storeScreen.screen_type,
          variants_screen_type: this.storeScreen.variants_screen_type
        });

        this.changeLineInScenario({
          task_tesseractspi: this.buffer_task_tesseractspi
        });
      } else {
        const elementManual = document.getElementById('button_Manual');
        elementManual.setAttribute('style', 'background-color: red;');
      }
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
     getCursorPositionTap() {
     const extractor = (event) =>
         event instanceof Touch ? null : [event.offsetX, event.offsetY];

     const mouseWithExtractor = reactive(useMouse({target: document.getElementById('image'), type: extractor}));
     const {pressed} = useMousePressed({target: document.getElementById('image')});

     watch(pressed, () => {
           if (pressed._value && this.flagClickTap) {
             this.X = Math.round(mouseWithExtractor.x * this.storeImage.multiplierPicture);
             this.Y = Math.round(mouseWithExtractor.y * this.storeImage.multiplierPicture);
             this.changedTapParamsAuto();
           }
     });
     },
     getCursorPositionSwipe() {
      const extractor = (event) =>
          event instanceof Touch ? null : [event.offsetX, event.offsetY];

      const mouseWithExtractor = reactive(useMouse({target: document.getElementById('image'), type: extractor}));
      let {pressed} = useMousePressed({target: document.getElementById('image')});
      let firstPoint = true;
      watch(pressed, () => {
        if (firstPoint && pressed._value && this.flagClickSwipe) {
          this.X1 = Math.round(mouseWithExtractor.x * this.storeImage.multiplierPicture);
          this.Y1 = Math.round(mouseWithExtractor.y * this.storeImage.multiplierPicture);
          firstPoint = false;
        } else if(!firstPoint && pressed._value && this.flagClickSwipe){
          this.X2 = Math.round(mouseWithExtractor.x * this.storeImage.multiplierPicture);
          this.Y2 = Math.round(mouseWithExtractor.y * this.storeImage.multiplierPicture);
          firstPoint = true;
          this.changedSwipeParamsAuto();
        }
        });


    },
   }
}
</script>

<style lang="scss">
.buttonBar_screen_screen{
  max-width: 60vw;
  background-color:orange;
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_screen_screen{
  min-height: 10vh;
  max-width: 70vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.third_level_screen_screen{
  min-height: 50vh;
  max-width: 70vw;
}
.fourth_level_screen_screen{
  min-height: 10vh;
  max-width: 70vw;
}
.first_level_columns_screen_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_columns_screen_screen .v-row{
  display: flex;
  align-items: self-start;
  justify-content: center;
}
.third_level_columns_screen_screen .v-row{
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.third_level_columns_screen_screen .task_command_view_screen_screen{
  min-height: 40vh;
  min-width: 20vw;
  max-width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen{
  .third_level_columns_screen_screen .v-container {
    min-height: 80vh;
    min-width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.fourth_level_columns_screen_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>