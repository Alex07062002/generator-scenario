<template>
  <v-col>
    <v-row class="second_level_check_text_screen">
      <v-col>
        <v-row class="second_level_columns_row_check_text_screen">
          <h5>Загрузить изображение</h5>
        </v-row>
        <v-row class="second_level_columns_row_check_text_screen">
          <v-btn :disabled="true">{{nameImage}}</v-btn>
        </v-row>
      </v-col>
      <v-col class="second_level_columns_check_text_screen">
        <v-btn @click="$refs.inputUpload.click()">Загрузить изображение</v-btn>
        <input v-show="false" ref="inputUpload" type="file" accept = "image/*" @change="loadImage" />
      </v-col>
    </v-row>
    <v-row >
      <v-col class="third_level_columns_check_text_screen">
        <v-container id="image_container">
          <div v-if="storeImage.dataURL === ''">
            <img id="image" alt="">
          </div>
          <div v-else>
            <img id="image" :src="storeImage.dataURL" alt="">
          </div>
        </v-container>
      </v-col>
      <v-col class="third_level_columns_check_text_screen">
        <v-row>
        <v-container>
          <div v-for="(item) in buffer_check_text">
            <v-row class="third_level_columns_row_check_text_screen">
              <v-col>
                <v-row>
            <h5 >{{item.name}}</h5>
                </v-row>
                <v-row class="third_level_columns_row_check_text_screen">
            <v-text-field type="input" @change="changedCheckText" v-model="item.value" variant="underlined">
            </v-text-field>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-col class="third_level_columns_check_text_screen">
                <v-btn type="danger" @click="deleteCheck()">-</v-btn>
                <v-btn type="primary" @click="add()">+</v-btn>
              </v-col>
        </v-container>
        </v-row>
        <v-row class="third_level_columns_row_check_text_screen">
          <v-col>
            <v-row>
            <h5>check_text_button</h5>
            </v-row>
            <v-row>
          <v-text-field type="input"
                        variant="underlined"
                        v-model="buffer_check_button"
                        @change="changedCheckText"></v-text-field>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="fourth_level_check_text_screen">
      <v-col class="fourth_level_columns_check_text_screen">
        <NuxtLink to="/GeneralJsonScreen"><v-btn>Конец текущего объекта</v-btn></NuxtLink>
      </v-col>
      <v-col class="fourth_level_columns_static_screen">
        <v-btn>Вернуться на шаг назад</v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import {useSaveScenario} from "~/stores/Scenario.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {mapActions, mapWritableState} from "pinia";
import {useImageState} from "~/stores/ImageObject.js";
import {readImageIntoMemory} from "~/stores/readImageIntoMemory.js";
export default {
  name:"CheckTextScreenJsonScreen",
    data(){
      return {
        nameImage: this.storeImage.nameFile,
            data:"",
        dataNum:0,
        buffer_check_text: JSON.parse(JSON.stringify(this.storeVariants.check_text)),
        buffer_check_button: JSON.parse(JSON.stringify(this.storeVariants.check_text_button)),
        buffer_scenario: JSON.parse(JSON.stringify(this.store.task_tesseractspi)),
      }
    },
  setup(){
    const store = useSaveScenario();
    const storeScreen = useScreenJson();
    const storeVariants = useVariantsScreenType();
    const storeImage = useImageState();
    return {store, storeScreen, storeVariants, storeImage};
  },
    methods:{
      deleteCheck(){
        if(this.buffer_check_text.length<=1){
          return false;
        }
        this.buffer_check_text.splice(this.buffer_check_text.length-1,1);
      },
      add(){
        if (this.buffer_check_text.length === 0){
          this.buffer_check_text.push({"name": "check_text", "value": ""});
        }
        else {
          this.buffer_check_text.push({"name": "check_text_" + this.buffer_check_text.length, "value": ""});
        }
      },
      ...mapWritableState(useVariantsScreenType,['check_text', 'check_text_button']),
      ...mapActions(useVariantsScreenType,{changeCheckText: '$patch'}),
      ...mapWritableState(useScreenJson,['variants_screen_type','screen_type']),
      ...mapActions(useScreenJson,{changeVariants: '$patch'}),
      ...mapWritableState(useSaveScenario, ['task_tesseractspi']),
      ...mapActions(useSaveScenario,{changeScreenObject:'$patch'}),

      changedCheckText(){

        this.changeCheckText({
          check_text: this.buffer_check_text,
          check_text_button: this.buffer_check_button,
        });
        this.changeVariants({
          variants_screen_type:  [{"check_text": this.storeVariants.check_text,
            "check_text_button":this.storeVariants.check_text_button,
            "task_bufferspi": this.storeVariants.task_bufferspi_screen}],
          screen_type: "",
        });

        this.buffer_scenario.splice(this.storeScreen.numberOfObjectInList,1,{
          "type_json_object": this.storeScreen.type_json_object,
          "screen_type": this.storeScreen.screen_type,
          "variants_screen_type": this.storeScreen.variants_screen_type,
        });
        this.changeScreenObject({
          task_tesseractspi: this.buffer_scenario
        });
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
@media screen {
  .third_level_columns_option_screen .v-container {
    min-height: 80vh;
    min-width: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.second_level_columns_check_text_screen{
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.second_level_columns_row_check_text_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.third_level_columns_row_check_text_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.third_level_columns_row_check_text_screen .v-col{
  display: flex;
  align-items: center;
  justify-content: center;
}
.fourth_level_check_text_screen{
  min-height: 10vh;
}
.fourth_level_columns_check_text_screen{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>