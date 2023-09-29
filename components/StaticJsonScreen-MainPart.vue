<template>
  <v-col>
  <v-row>
    <v-col>
      <v-btn @click="typeStaticObject='OTG'">Add OTG</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="typeStaticObject='ADB'">Add ADB</v-btn>
    </v-col>
    <v-col>
      <v-btn>Paused 3 sec</v-btn>
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
        <h5>Текущий json объект</h5>
      </v-row>
      <v-row>
        <v-btn disabled>{{typeStaticObject}}</v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <h5>Изображение</h5>
      </v-row>
      <v-row>
        <v-btn disabled>{{screenName}}</v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-btn><input type="file" ref="doc"/>
        Загрузить изображение</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-container>
        <h5>{{context}}</h5>
      </v-container>
    </v-col>
    <v-col>
      <div v-if="isManualPressed">
        <v-row>
          <h5>Укажите количество секунд</h5>
          <v-text-field></v-text-field>
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
  name:"MainStaticJsonScreen",
  data(){
    return{
      typeStaticObject:"",
      isManualPressed:false,
      screenName:"",
      context: null
    }
  },
  methods:{

  }
}
</script>
