<template>
  <v-col>
    <v-row>
      <v-col>
        <v-row>
          <h5>Загрузить изображение</h5>
        </v-row>
        <v-row>
          <v-btn disabled>{{nameImage}}</v-btn>
        </v-row>
      </v-col>
      <v-col>
        <v-btn>Загрузить изображение</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <b-container>
          <h5>Это контейнер изображения</h5>
        </b-container>
      </v-col>
      <v-col>
        <v-row>
        <v-container>
          <div v-for="(item,index) in arrayData" :key="item.id">
            <h5 v-if="id=0">check_text</h5>
            <h5 v-else>check_text_{{id}}</h5>
            <v-text-field type="input" v-model="item.data">
            </v-text-field>
            <v-btn type="danger" @click="deleteCheck(index)">-</v-btn>
          </div>
          <v-btn type="primary" @click="add()">+</v-btn>
        </v-container>
          </v-row>
            <v-row>
              <h5>check_text_button</h5>
              <v-text-field></v-text-field>
            </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name:"CheckTextScreenJsonScreen",
    data(){
      return {
        nameImage:"",
        arrayData:[
          {
            id:"",
            data:""
          }
        ],
        dataNum:0
      }
    },
    methods:{
      deleteCheck(index){
        if(this.arrayData.length<=1){
          return false
        }
        this.arrayData.splice(index,1)
      },
      add(){
        this.arrayData.push(
            {
              id:this.dataNum++,
              data:''
            }
        )
      },
    }
}
</script>
