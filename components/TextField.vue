<template>
  <div>
    <v-container class="startScreen">
      <v-responsive
          class="mx-auto"
          max-width="500"
      >
    <v-text-field class = "textfield" label="Введите task-type"
                  id="task-type"
                  v-model="taskName"
                  placeholder="Введите task-type"
                  variant="underlined"
                  trim
    ></v-text-field>
      <v-text-field class = "textfield" label="Введите device-id"
                    id="device-id"
                    v-model="deviceName"
                    placeholder="Введите device_id"
                    variant="underlined"
                    trim
      ></v-text-field>
      <v-text-field class = "textfield" label="Введите country"
                    id="country"
                    v-model="countryName"
                    placeholder="Введите country"
                    variant="underlined"
                    trim
      ></v-text-field>
      <v-text-field class = "textfield" label="Введите language"
                    id="language"
                    v-model="languageName"
                    placeholder="Введите language"
                    variant="underlined"
                    trim
      ></v-text-field>
      </v-responsive>
      <v-row class="startScreen-createScenario">
      <v-col>
        <v-banner-text class="generatorScenarioName"
                       v-model="generateName"
                     v-text="generateScenarioName"
                      trim
        ></v-banner-text>
      </v-col>
      <v-col class="button_start_screen">
        <NuxtLink to="/GeneralJsonScreen">
          <v-btn color="success" @click="setNameJson">
            Создать сценарий
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapWritableState, mapActions} from "pinia";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useSaveScenario} from "~/stores/Scenario.js";

export default {

  name:"Textfield",
  setup(){
    const store = useSaveScenario();
    return {store};
  },
  methods: {
  ...mapWritableState(useNameJsonFile,['nameJsonFile']),
  ...mapActions(useNameJsonFile,{changeNameJsonFile:'$patch'}),
    ...mapWritableState(useSaveScenario,['task_type','device_id','country','language']),
    ...mapActions(useSaveScenario, {changeScenario:'$patch'}),
    setNameJson(){
      this.changeNameJsonFile({
        nameJsonFile: this.generateScenarioName,
      });

      this.store.$reset();

      this.changeScenario({
      task_type: this.taskName.toLowerCase(),
      device_id: this.deviceName.toUpperCase(),
      country: this.countryName.toUpperCase(),
      language: this.countryName.toLowerCase()+"+"+this.languageName.toLowerCase(),
    });
    }
  },
  computed: {
    generateScenarioName(){
       return this.deviceName+"_"+this.countryName.toLowerCase()+"_"+this.languageName.toLowerCase()+"_"+this.taskName.toLowerCase()+".json"
    },

  },
  data() {
    return {
      deviceName:"",
      countryName:"",
      languageName:"",
      taskName: "",
      generateName:""
    }
  },
}

</script>

<style lang="scss">
.startScreen-createScenario{
  margin: 30vh 0 0 0;
}
.button_start_screen{
  margin-right: 0;
  display: flex;
  flex-direction: row-reverse;
}
</style>