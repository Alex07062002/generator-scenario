<template>
  <div>
    <div v-if:="typeOfObject === 'json static object'">
    <v-tabs align-with-title>
      <v-tab><NuxtLink to="/StaticJsonScreen">Активен json static object</NuxtLink></v-tab>
      <v-tab :disabled="true"><NuxtLink to="/CheckTextScreenJsonScreen">Настройка json screen object
      </NuxtLink></v-tab>
      <v-tab :disabled="true"><NuxtLink to="/ScreenJsonScreen">Активен json screen object</NuxtLink></v-tab>
      <v-tab :disabled="true"><NuxtLink to="/OptionScreenJsonScreen">Активен option json screen object</NuxtLink></v-tab>
    </v-tabs>
    </div>
    <div v-else>
      <v-tabs align-with-title>
        <v-tab :disabled="true"><NuxtLink to="/StaticJsonScreen">Активен json static object</NuxtLink></v-tab>
        <v-tab><NuxtLink to="/CheckTextScreenJsonScreen">Настройка json screen object
        </NuxtLink></v-tab>
        <v-tab><NuxtLink to="/ScreenJsonScreen">Активен json screen object</NuxtLink></v-tab>
        <v-tab><NuxtLink to="/OptionScreenJsonScreen">Активен option json screen object</NuxtLink></v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonNavBar',
  props:{
    typeOfObject: String
  }
}
</script>
