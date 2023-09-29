<template>
  <v-col>
  <v-row>
    <v-col>
      <v-btn @click="isRepeatPressed = !isRepeatPressed">Add count_repeat</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isTargetTextPressed = !isTargetTextPressed">Add target_text</v-btn>
    </v-col>
    <v-col>
      <v-btn @click=" isScreenshotPressed = !isScreenshotPressed">Add screenshot_cropping</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isTapTargetTextPressed = !isTapTargetTextPressed">Add tap_target_text</v-btn>
    </v-col>
  </v-row>
    <v-row>
      <v-col>
        <v-row>
          <h5>Изображение</h5>
        </v-row>
        <v-row>
          <v-btn disabled>{{screenName}}</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          <h5>Это контейнер для изображения</h5>
        </v-container>
      </v-col>
      <v-col>
        <div v-if="isRepeatPressed">
          <v-row>
            <h5>Укажите количество повторений</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isTargetTextPressed">
          <v-row>
            <h5>Add target_text</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isScreenshotPressed">
          <v-row>
            <h5>Какой параметр добавить</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isTapTargetTextPressed">
          <v-row>
            <h5>Определять координаты и нажимать на текст? </h5><v-checkbox></v-checkbox>
          </v-row>
        </div>
        <v-row>
          <h5>Здесь будет скрипт line_id</h5>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn><NuxtLink to="/GeneralJsonScreen">Конец текущего объекта</NuxtLink></v-btn>
      </v-col>
      <v-col>
        <v-btn>Вернуться на шаг назад</v-btn>
      </v-col>
      <v-col>
        <v-btn><NuxtLink to="/ChoiceJsonObjectScreen">Создать вложенный объект</NuxtLink></v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default{
  name:"OptionScreenJsonScreenMainPart",
  data(){
    return{
      screenName:"",
      isRepeatPressed:false,
      isTargetTextPressed:false,
      isScreenshotPressed:false,
      isTapTargetTextPressed:false
    }
  }
}
</script>
