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
          <v-col>
            <v-row cols="auto">
              <Logo/>
            </v-row>
            <v-row>
              <LineIdBar/>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-row>
              <JsonTypeNavBar  :currentPage="'option'"/>
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
export default{
  name:"OptionScreenJsonScreen",
  components:['~/components']
}
</script>
