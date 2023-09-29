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
            <v-row no-gutters>
              <MainScreenButtons class="buttons_main_screen"/>
            </v-row>
            <v-row no-gutters>
              <MainScreenTable class="table_main_screen"/>
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