<template>
  <div>
    <div>
      <v-col>
        <v-row>
          <MenuBar/>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <SettingsBar/>
          </v-col>
          <v-col cols="auto">
            <Logo/>
          </v-col>
          <v-col>
            <v-row>
              <v-responsive
                  class="mx-auto"
                  max-width="500"
              >
              <v-text-field class = "taskTypeEnter" label="Название новой задачи"
                            id="task-type"
                            placeholder="Введите task-type"
                            v-model="taskNameField"
              ></v-text-field>
              </v-responsive>
            </v-row>
            <v-row class="textfield_add_taskType">
              <div v-if='taskNameField === ""'>
                <v-btn :disabled="true" color="red">Сохранить</v-btn>
              </div>
              <div v-else>
                <NuxtLink to="/FinalTaskTypeScreen"><v-btn @click="saveTaskType" color="green">Сохранить
                </v-btn></NuxtLink>
              </div>
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
      taskNameField: ""
    }
  },
  computed:{
  },
  methods: {
    ... mapWritableState(useSaveTaskType,['task_type']),
    ... mapActions(useSaveTaskType,['$patch']),
    saveTaskType(){
      this.$patch({
        task_type: this.taskNameField
      })
    }
  }
}
</script>

<style lang="scss">
.textfield_add_taskType{
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>