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
            <v-row>
              <Logo/>
            </v-row>
            <v-row>
              <h5>{{storeName.getName}}</h5>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <h3>Какой объект json создаём?</h3>
            </v-row>
            <v-row>
              <v-col>
                <NuxtLink to="/StaticJsonScreen">
                <v-btn @click="choiceObject">json static object</v-btn>
                </NuxtLink>
              </v-col>
              <v-col>
                <NuxtLink to="/CheckTextScreenJsonScreen">
                <v-btn @click="choiceObject">json screen object</v-btn>
                </NuxtLink>
              </v-col>
            </v-row>
            <v-row>
              <v-list-item><img @click="" :src="images['newImage']" alt="">
              </v-list-item>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import images from "~/static/images.js";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {mapWritableState,mapActions} from "pinia";
import {useSaveScenario} from "~/stores/Scenario.js";

export default{
  name:"ChoiceJsonObjectScreen",
  components: [
      '~/components'
  ],
  methods:{
    checkTypeJsonObjectPressed(){}, // TODO light pressed button and link to need page
    ...mapWritableState(useLineId,['lineId']),
    ...mapActions(useLineId,['$patch']),
    choiceObject(){
      if (this.store.getTaskTesseractspi[this.store.taskTesseractspi.length-1].type_json_object === 'json screen object') {
        this.$patch({
          lineId: Number(this.store.getTaskTesseractspi[this.store.taskTesseractspi.length - 1].variants_screen_type[0].task_bufferspi
          [this.store.getTaskTesseractspi[this.store.taskTesseractspi.length - 1].variants_screen_type[0].task_bufferspi.length-1].line_id)+1
        });
      }
      else {
        this.$patch({
          lineId: Number(this.store.getTaskTesseractspi[this.store.taskTesseractspi.length - 1].task_bufferspi
              [this.store.getTaskTesseractspi[this.store.taskTesseractspi.length - 1].task_bufferspi.length-1].line_id)+1
        });
      }
    }
  },
  data(){
    return{
      images
    }
  },
  setup(){
    const store = useSaveScenario();
    const storeName = useNameJsonFile();
    const storeLineId = useLineId();
    return {store, storeName, storeLineId}
  },
}
</script>
