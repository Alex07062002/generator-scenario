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
            <Logo/>
          </v-col>
          <v-col cols="8">
      <TextField/>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StartScreen',
  components:['~/components']
}
</script>
