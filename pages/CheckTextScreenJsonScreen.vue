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
            <v-row>
              <JsonTypeNavBar  :currentPage="'checkText'"/>
            </v-row>
            <v-row>
              <CheckTextScreenJsonScreenMainPart/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
//TODO from checktext to screen json -> load line_id and screen json
export default{
  name:"CheckTextScreenJsonScreen",
  components:[
      '~/components'
  ]
}
</script>
