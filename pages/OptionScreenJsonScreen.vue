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
              <LineIdBar/>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row>
              <JsonTypeNavBar/>
            </v-row>
            <v-row>
              <OptionScreenJsonScreenMainPart/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import LineIdBar from "~/components/LineIdBar.vue";
import OptionScreenJsonScreenMainPart from "~/components/OptionScreenJsonScreen-MainPart.vue";

export default{
  name:"OptionScreenJsonScreen",
  components:['~/components']
}
</script>
