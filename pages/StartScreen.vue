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
