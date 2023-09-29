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
            <LineIdBar :current-line-id="storeLineId.lineId" :json-file="storeName.getName"
                       :type-of-json-object="'json static object'"
                       :task-bufferspi = "storeStatic.task_bufferspi"/>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row>
            <JsonTypeNavBar :type-of-object="'json static object'"/>
          </v-row>
          <v-row>
            <StaticJsonScreenMainPart/>
          </v-row>
        </v-col>
      </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import {useLineId} from "~/stores/LineIdObject.js";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {useStaticJson} from "~/stores/StaticJsonObject.js";

export default {
  name: "StaticJsonScreen",
  components: ['~/components'],
  setup() {
    const store = useSaveScenario();
    const storeLineId = useLineId();
    const storeName = useNameJsonFile();
    const storeStatic = useStaticJson();
    return {store, storeLineId, storeName, storeStatic}
  }
}
</script>
