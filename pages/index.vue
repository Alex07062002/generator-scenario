<template>
  <div>
    <div>
      <v-col>
        <v-row>
          <MenuBar/>
        </v-row>
        <v-row>
          <v-col>
            <SettingsBar/>
          </v-col>
          <v-col>
            <Logo/>
          </v-col>
          <v-col>
            <v-row>
              <MainScreenButtons/>
            </v-row>
            <v-row>
              <MainScreenTable/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
export default{
  name:"MainScreen",
  components:[
    '~/components'
  ]
}

</script>