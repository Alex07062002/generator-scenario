<template>
  <v-col>
  <v-row>
    <v-col>
      <v-btn @click="isTapPressed = !isTapPressed">Add tap</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isSwipePressed = !isSwipePressed">Add swipe</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isInputTextPressed =!isInputTextPressed">Input text</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isLocalJsonPressed = !isLocalJsonPressed">Add local json</v-btn>
    </v-col>
    <v-col>
      <v-btn>Paused 5 sec</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="isManualPressed = !isManualPressed">Add manual paused</v-btn>
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
  <v-col>
    <v-btn>Загрузить изображение</v-btn>
  </v-col>
</v-row>
    <v-row>
      <v-col>
        <v-container>
          <h5>Это контейнер для изображения</h5>
        </v-container>
      </v-col>
      <v-col>
        <div v-if="isManualPressed">
          <v-row>
            <h5>Укажите количество секунд</h5>
            <v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isTapPressed">
          <v-row>
            <h5>Координаты: X</h5><v-text-field></v-text-field><h5>Y</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isSwipePressed">
          <v-row>
            <h5>Координаты:</h5>
            <h5>X1</h5><v-text-field></v-text-field><h5>Y1</h5><v-text-field></v-text-field>
            <h5>X2</h5><v-text-field></v-text-field><h5>Y2</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isInputTextPressed">
          <v-row>
            <h5>Добавить текст</h5><v-text-field></v-text-field>
          </v-row>
        </div>
        <div v-if="isLocalJsonPressed">
          <v-row>
            <v-btn>Укажите файл</v-btn><v-text-field></v-text-field>
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
  name:"ScreenJsonScreenMainPart",
  data(){
    return{
      isTapPressed:false,
      isSwipePressed:false,
      isInputTextPressed:false,
      isLocalJsonPressed:false,
      isManualPressed:false,
      screenName: ""
    }
  }
}
</script>
