<template>
  <div>
    <div>
      <v-col>
        <v-row>
          <MenuBar/>
        </v-row>
        <v-row>
          <v-col cols="1">
            <SettingsBar/>
          </v-col>
          <v-col cols="3">
            <Logo/>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-label for="task-type">{{labelTaskType}}</v-label>
              <v-text-field class = "taskTypeEnter"
                            id="task-type"
                            placeholder="Введите task-type"
                            v-model="taskNameField"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-btn @click="saveTaskType"><NuxtLink to="/FinalTaskTypeScreen">Сохранить</NuxtLink></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>

import {mapActions,mapWritableState} from "pinia";
import {useSaveTaskType} from "~/stores/saveDB.js";

export default {
  name: "AddTaskTypeScreen",
  components: [
      '~/components'
  ],
  data() {
    return {
      labelTaskType: "Название новой задачи",
      taskNameField: ""
    }
  },
  computed:{
    ... mapWritableState(useSaveTaskType,['taskTypeName'])
  },
  mounted(){
  },
  methods: {
    ... mapActions(useSaveTaskType,['$patch']),
    saveTaskType(){
      this.$patch({
        taskTypeName: this.taskNameField
      })
    }
  }
}
</script>
