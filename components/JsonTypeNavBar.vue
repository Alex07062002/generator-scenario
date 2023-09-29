<template>
  <div>
    <div v-if:="typeOfObject === 'json static object'">
    <v-tabs align-with-title>
      <NuxtLink to="/StaticJsonScreen"><v-tab class="staticNavBar">Json static object</v-tab></NuxtLink>
      <NuxtLink to="/CheckTextScreenJsonScreen"><v-tab class="screenNavBar" :disabled="true">Check text screen object
      </v-tab></NuxtLink>
      <NuxtLink to="/ScreenJsonScreen"><v-tab class="screenNavBar" :disabled="true">Json screen object</v-tab></NuxtLink>
      <NuxtLink to="/OptionScreenJsonScreen"><v-tab class="screenNavBar" :disabled="true">Option json screen object</v-tab></NuxtLink>
    </v-tabs>
    </div>
    <div v-else>
      <div v-if='currentPage === "checkText"'>
      <v-tabs align-with-title>
        <v-tab class="staticNavBar" :disabled="true"><NuxtLink to="/StaticJsonScreen">Json static object</NuxtLink></v-tab>
        <NuxtLink to="/CheckTextScreenJsonScreen"><v-tab class="screenNavBar">Check text screen object
        </v-tab></NuxtLink>
        <NuxtLink to="/ScreenJsonScreen"><v-tab class="screenNavBar">Json screen object</v-tab></NuxtLink>
        <NuxtLink to="/OptionScreenJsonScreen"><v-tab class="screenNavBar">Option json screen object</v-tab></NuxtLink>
      </v-tabs>
      </div>
      <div v-else-if='currentPage === "option"'>
        <v-tabs align-with-title>
          <v-tab class="staticNavBar" :disabled="true"><NuxtLink to="/StaticJsonScreen">Json static object</NuxtLink></v-tab>
          <NuxtLink to="/OptionScreenJsonScreen"><v-tab class="screenNavBar">Option json screen object</v-tab></NuxtLink>
          <NuxtLink to="/CheckTextScreenJsonScreen"><v-tab class="screenNavBar">Check text screen object
          </v-tab></NuxtLink>
          <NuxtLink to="/ScreenJsonScreen"><v-tab class="screenNavBar">Json screen object</v-tab></NuxtLink>
        </v-tabs>
      </div>
      <div v-else>
        <v-tabs align-with-title>
          <v-tab class="staticNavBar" :disabled="true"><NuxtLink to="/StaticJsonScreen">Json static object</NuxtLink></v-tab>
          <NuxtLink to="/ScreenJsonScreen"><v-tab class="screenNavBar">Json screen object</v-tab></NuxtLink>
          <NuxtLink to="/OptionScreenJsonScreen"><v-tab class="screenNavBar">Option json screen object</v-tab></NuxtLink>
          <NuxtLink to="/CheckTextScreenJsonScreen"><v-tab class="screenNavBar">Check text screen object
          </v-tab></NuxtLink>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonNavBar',
  props:{
    typeOfObject: String,
    currentPage: String
  }
}
</script>

<style lang="scss">
.staticNavBar{
  background-color: skyblue;
}
.screenNavBar{
  background-color: orange;
}
</style>