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
            <v-row>
              <Logo/>
            </v-row>
            <v-row>
              <LineIdBar :current-line-id="storeLineId.lineId" :json-file="storeName.getName"
                         :type-of-json-object="'json screen object'"
                         :task-bufferspi = "[]"/>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-row>
              <JsonTypeNavBar/>
            </v-row>
            <v-row>
              <ScreenJsonScreenMainPart/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import {useSaveScenario} from "~/stores/Scenario.js";
import {useLineId} from "~/stores/LineIdObject.js";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useScreenJson} from "~/stores/ScreenJsonObject.js";

export default{
  name:"ScreenJsonScreen",
  components:['~/components'],
  setup(){
    const store = useSaveScenario();
    const storeLineId = useLineId();
    const storeName = useNameJsonFile();
    const storeScreen = useScreenJson();
    return {store, storeLineId, storeName, storeScreen}
  }
}
</script>
