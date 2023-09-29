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
            <v-col cols="auto">
                <v-row class="first_level_final_screen">
                    <v-col cols="auto" class="first_level_columns_final_screen">
                        <img :src="images['voteImage']" alt="">
                    </v-col>
                    <v-col cols="auto" class="first_level_columns_final_screen">
                        <v-row>
                            <h3>{{"Новый сценарий успешно создан!"}}</h3>
                        </v-row>
                        <v-row>
                            <h3>{{this.storeName.getName}}</h3>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="second_level_final_screen">
                    <NuxtLink to="/">
                    <v-btn  color="purple" @click="resetStorePinia">Publish</v-btn>
                    </NuxtLink>
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
import {useSaveScenario} from "~/stores/Scenario.js";
import {useStaticJson} from "~/stores/StaticJsonObject.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";
import {useVariantsScreenType} from "~/stores/VariantsScreenType.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useImageState} from "~/stores/ImageObject.js";

export default{
  name:"FinalScreen",
  components:['~/components'],
  data(){
    return{
      images
    }
  },
  setup(){
    const store = useSaveScenario();
    const storeName = useNameJsonFile();
    const storeLine = useLineId();
    const storeVariants = useVariantsScreenType();
    const storeScreen = useScreenJson();
    const storeStatic = useStaticJson();
    const storeImage = useImageState();
    return {store, storeName, storeLine, storeVariants, storeScreen, storeStatic, storeImage}
  },
  methods:{
    resetStorePinia(){
      this.storeLine.$reset();
      this.storeVariants.$reset();
      this.storeScreen.$reset();
      this.storeStatic.$reset();
      this.store.$reset();
      this.storeName.$reset();
      this.storeImage.$reset();
    }
  }
}
</script>

<style lang="scss">
.first_level_final_screen{
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.first_level_columns_final_screen{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.first_level_columns_final_screen .v-row{
  display: flex;
  align-items: center;
  justify-content: center;
}

.second_level_final_screen{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
