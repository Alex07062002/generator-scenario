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
              <v-col cols="auto">
                <img :src="images['voteImage']" alt="">
              </v-col>
              <v-col cols="auto" class="text_final_country">
                <v-row>
                  <h3>Новая страна и язык успешно добавлены:<br>
                  {{store.country}}<br>
                    {{store.language}}</h3>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="button_final_country">
            <NuxtLink to="/CountryScreen">
                <v-btn color="purple">Назад</v-btn>
              </NuxtLink>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import images from "~/static/images.js";
import {useSaveCountryLang} from "~/stores/saveDB.js";
export default{
  name:"FinalCountryScreen",
  components:['~/components'],
  data(){
    return{
      images
    }
  },
  setup(){
    const store = useSaveCountryLang();
    return {store}
  }
}
</script>

<style lang="scss">
.text_final_country{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button_final_country{
  display: flex;
  flex-direction: row-reverse;
}
</style>