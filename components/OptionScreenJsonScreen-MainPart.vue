<template xmlns="http://www.w3.org/1999/html">
  <v-col>
  <v-row class="buttonBar_option_screen">
    <div v-if='storeLine.count_repeat !== null'>
    <v-col class="first_level_columns_option_screen">
      <v-btn id="button_Count_repeat" style="outline: 3px solid #00FF00" @click="pressedCountRepeat">Add count_repeat</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_option_screen">
        <v-btn id="button_Count_repeat" @click="pressedCountRepeat">Add count_repeat</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.OpenCV_device_id !== null && storeLine.count_repeat === null &&
storeLine.screenshot_cropping === null && storeLine.tap_target_text === null'>
    <v-col class="first_level_columns_option_screen">
      <v-btn id="button_target_text" style="outline: 3px solid #00FF00" @click="pressedTargetText">Add target_text</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_option_screen">
        <v-btn id="button_target_text" @click="pressedTargetText">Add target_text</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.screenshot_cropping !== null'>
    <v-col class="first_level_columns_option_screen">
      <v-btn id="button_screenshot_cropping" style="outline: 3px solid #00FF00" @click="pressedScreenshot">Add screenshot_cropping</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_option_screen">
        <v-btn id="button_screenshot_cropping" @click="pressedScreenshot">Add screenshot_cropping</v-btn>
      </v-col>
    </div>
    <div v-if='storeLine.tap_target_text !== null'>
    <v-col class="first_level_columns_option_screen">
      <v-btn id="button_tap_target_text" style="outline: 3px solid #00FF00" @click="pressedTapTargetText">Add tap_target_text</v-btn>
    </v-col>
    </div>
    <div v-else>
      <v-col class="first_level_columns_option_screen">
        <v-btn id="button_tap_target_text" @click="pressedTapTargetText">Add tap_target_text</v-btn>
      </v-col>
    </div>
  </v-row>
    <v-row class="second_level_option_screen">
      <v-col class="second_level_columns_option_screen">
        <v-row>
          <h5>Изображение</h5>
        </v-row>
        <v-row>
          <v-btn :disabled="true">{{screenName}}</v-btn>
        </v-row>
      </v-col>
      <v-col class="second_level_columns_option_screen">
        <v-btn @click="$refs.inputUpload.click()">Загрузить изображение</v-btn>
        <input v-show="false" ref="inputUpload" type="file" accept = "image/*" @change="loadImage" />
      </v-col>
    </v-row>
    <v-row class="third_level_option_screen">
      <v-col class="third_level_columns_option_screen">
        <v-container id="image_container">
          <div v-if="storeImage.dataURL === ''">
            <img id="image" alt="">
          </div>
          <div v-else>
            <img id="image" :src="storeImage.dataURL" alt="">
          </div>
        </v-container>
      </v-col>
      <v-col class="third_level_columns_option_screen">
        <div v-if="isRepeatPressed">
          <v-row>
            <h5>Укажите количество повторений</h5>
            <v-text-field  variant="underlined" v-model="count_repeat" @change="changedCountRepeat"></v-text-field>
          </v-row>
        </div>
        <div v-if="isTargetTextPressed">
          <v-row>
            <h5>Add target_text</h5>
            <v-text-field  variant="underlined" v-model="target_text" @change="changedTargetText"></v-text-field>
          </v-row>
        </div>
        <div v-if="isScreenshotPressed">
          <v-row>
            <h5>Какой параметр добавить</h5>
            <v-text-field  variant="underlined" v-model="screenshot" @change="changedScreenshoot"></v-text-field>
          </v-row>
        </div>
        <div v-if="isTapTargetTextPressed">
          <v-row>
            <h5>{{"Определять координаты и нажимать на текст?  "}}</h5>
            <input type="checkbox" v-model="flagTapTargetText" @click="checkTapTargetText"/>
            <!--по непонятной причине не работает-->
            <v-checkbox hide-details></v-checkbox>
          </v-row>
        </div>
        <v-row class="task_command_view_option_screen">
          <v-col>
            <h5>{</h5>
            <div v-for="(item) in storeLine.getLineIdScreenOption.split('~')">
              <div v-if='item !== ""'>
                <h5>{{'&nbsp;&nbsp;&nbsp;&nbsp;'+item+','}}</h5>
              </div>
            </div>
            <h5>}</h5>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="fourth_level_option_screen">
      <v-col class="fourth_level_columns_option_screen">
        <NuxtLink to="/GeneralJsonScreen"><v-btn>Конец текущего объекта</v-btn></NuxtLink>
      </v-col>
      <v-col class="fourth_level_columns_option_screen">
        <v-btn>Вернуться на шаг назад</v-btn>
      </v-col>
      <v-col class="fourth_level_columns_option_screen">
        <NuxtLink to="/ChoiceJsonObjectScreen"><v-btn :disabled="true">Создать вложенный объект</v-btn></NuxtLink>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {mapActions, mapWritableState} from "pinia";
import {useImageState} from "~/stores/ImageObject.js";
import {readImageIntoMemory} from "~/stores/readImageIntoMemory.js";

export default{
  name:"OptionScreenJsonScreenMainPart",
  data(){
    return{
      screenName: this.storeImage.nameFile,
      isRepeatPressed:false,
      isTargetTextPressed:false,
      isScreenshotPressed:false,
      isTapTargetTextPressed:false,
      flagTapTargetText: false,
      count_repeat: "",
      target_text: "",
      screenshot: "",
      buffer_task_bufferspi_screen: JSON.parse(JSON.stringify(this.storeVariants.task_bufferspi_screen)),
      buffer_variants_screen_type: JSON.parse(JSON.stringify(this.storeScreen.variants_screen_type)),
      buffer_task_tesseractspi: JSON.parse(JSON.stringify(this.store.task_tesseractspi)),
    }
  },
  setup() {
    const store = useSaveScenario();
    const storeLine = useLineId();
    const storeVariants = useVariantsScreenType();
    const storeScreen = useScreenJson();
    const storeImage = useImageState();
    return {store, storeLine, storeVariants, storeScreen, storeImage}
  },
  computed:{
    getCountRepeat(){
      return this.count_repeat;
    },
    getTargetText(){
      return this.target_text;
    },
    getScreenshot(){
      return this.screenshot;
    },
  },
  methods:{

    ...mapWritableState(useLineId,['lineId','task','task_command','tech_comment','path','OpenCV_device_id','count_repeat',
      'screenshot_cropping','target_text','tap_target_text']),
    ...mapActions(useLineId, {changeTaskCommand:'$patch'}),
    ...mapWritableState(useVariantsScreenType, ['task_bufferspi_screen']),
    ...mapActions(useVariantsScreenType, {changeVariants:'$patch'}),
    ...mapWritableState(useScreenJson,['variants_screen_type']),
    ...mapActions(useScreenJson, {changeLineInScreen:'$patch'}),
    ...mapWritableState(useSaveScenario,['task_tesseractspi']),
    ...mapActions(useSaveScenario, {changeLineInScenario:'$patch'}),

    pressedCountRepeat(){

      const elementCountRepeat = document.getElementById('button_Count_repeat');
      const elementTargetText = document.getElementById('button_target_text');
      const elementScreenshot = document.getElementById('button_screenshot_cropping');
      const elementTapTargetText = document.getElementById('button_tap_target_text');


      elementCountRepeat.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementTargetText.setAttribute('style', '');
      elementScreenshot.setAttribute('style', '');
      elementTapTargetText.setAttribute('style', '');

      this.isRepeatPressed = true;
      this.isTargetTextPressed = false;
      this.isScreenshotPressed = false;
      this.isTapTargetTextPressed = false;

      this.count_repeat = null;
      this.target_text = null;
      this.screenshot = null;
      this.flagTapTargetText = false;

    },

    checkCountRepeatParams(){
      if (isNaN(this.getCountRepeat.trim())) {
        return true;
      }
      else if(this.getCountRepeat === ""){
        return true;
      }
      return false;
    },

    changedCountRepeat(){

      if(!this.checkCountRepeatParams()) {

        const elementCountRepeat = document.getElementById('button_Count_repeat');
        elementCountRepeat.setAttribute('style', 'background-color: white; outline: 3px solid #00FF00;');

        this.changeTaskCommand({
          task: "check",
          task_command: "otg -s " + this.store.device_id + " shell input check " + this.storeScreen.screen_type,
          tech_comment: null,
          path: null,
          OpenCV_device_id: "{Arg12}",
          count_repeat: this.getCountRepeat,
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
      }
      else{
        const elementCountRepeat = document.getElementById('button_Count_repeat');
        elementCountRepeat.setAttribute('style', 'background-color: red;');
      }
    },

    pressedTargetText(){

      const elementCountRepeat = document.getElementById('button_Count_repeat');
      const elementTargetText = document.getElementById('button_target_text');
      const elementScreenshot = document.getElementById('button_screenshot_cropping');
      const elementTapTargetText = document.getElementById('button_tap_target_text');


      elementCountRepeat.setAttribute('style', '');
      elementTargetText.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementScreenshot.setAttribute('style', '');
      elementTapTargetText.setAttribute('style', '');

      this.isRepeatPressed = false;
      this.isTargetTextPressed = true;
      this.isScreenshotPressed = false;
      this.isTapTargetTextPressed = false;

      this.count_repeat = null;
      this.target_text = null;
      this.screenshot = null;
      this.flagTapTargetText = false;

    },

    changedTargetText(){

      this.changeTaskCommand({
        task: "check",
        task_command: "otg -s " + this.store.device_id + " shell input check " + this.storeScreen.screen_type,
        tech_comment: null,
        path: null,
        OpenCV_device_id: "{Arg12}",
        count_repeat: null,
        screenshot_cropping: null,
        target_text: this.getTargetText,
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

    pressedScreenshot(){

      const elementCountRepeat = document.getElementById('button_Count_repeat');
      const elementTargetText = document.getElementById('button_target_text');
      const elementScreenshot = document.getElementById('button_screenshot_cropping');
      const elementTapTargetText = document.getElementById('button_tap_target_text');


      elementCountRepeat.setAttribute('style', '');
      elementTargetText.setAttribute('style', '');
      elementScreenshot.setAttribute('style', 'outline: 3px solid #00FF00;');
      elementTapTargetText.setAttribute('style', '');

      this.isRepeatPressed = false;
      this.isTargetTextPressed = false;
      this.isScreenshotPressed = true;
      this.isTapTargetTextPressed = false;

      this.count_repeat = null;
      this.target_text = null;
      this.screenshot = null;
      this.flagTapTargetText = false;

    },

    changedScreenshoot(){

      this.changeTaskCommand({
        task: "check",
        task_command: "otg -s " + this.store.device_id + " shell input check " + this.storeScreen.screen_type,
        tech_comment: null,
        path: null,
        OpenCV_device_id: "{Arg12}",
        count_repeat: null,
        screenshot_cropping: this.getScreenshot,
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

    pressedTapTargetText(){

      const elementCountRepeat = document.getElementById('button_Count_repeat');
      const elementTargetText = document.getElementById('button_target_text');
      const elementScreenshot = document.getElementById('button_screenshot_cropping');
      const elementTapTargetText = document.getElementById('button_tap_target_text');


      elementCountRepeat.setAttribute('style', '');
      elementTargetText.setAttribute('style', '');
      elementScreenshot.setAttribute('style', '');
      elementTapTargetText.setAttribute('style', 'outline: 3px solid #00FF00;');

      this.isRepeatPressed = false;
      this.isTargetTextPressed = false;
      this.isScreenshotPressed = false;
      this.isTapTargetTextPressed = true;

      this.count_repeat = null;
      this.target_text = null;
      this.screenshot = null;
      this.flagTapTargetText = false;

    },

    checkTapTargetText(){
      if (!this.flagTapTargetText){

        this.changeTaskCommand({
          task: "check",
          task_command: "otg -s " + this.store.device_id + " shell input check " + this.storeScreen.screen_type,
          tech_comment: null,
          path: null,
          OpenCV_device_id: "{Arg12}",
          count_repeat: null,
          screenshot_cropping: this.getScreenshot,
          target_text: this.storeVariants.check_text[0].value || "", //FIXME change this
          tap_target_text: "yes"
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
  }
}
</script>


<style lang="scss">
.buttonBar_option_screen{
  max-width: 70vw;
  background-color:orange;
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_option_screen{
  min-height: 10vh;
  max-width: 70vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.third_level_option_screen{
  min-height: 50vh;
  max-width: 70vw;
}
.fourth_level_option_screen{
  min-height: 10vh;
  max-width: 70vw;
}
.first_level_columns_option_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_columns_option_screen .v-row{
  display: flex;
  align-items: self-start;
  justify-content: center;
}
.third_level_columns_option_screen .v-row{
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.third_level_columns_option_screen .task_command_view_option_screen{
  min-height: 40vh;
  min-width: 20vw;
  max-width: 30vw;
  outline: 3px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen {
  .third_level_columns_option_screen .v-container {
    min-height: 80vh;
    min-width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.fourth_level_columns_option_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>