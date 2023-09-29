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
            <v-col>
                <v-row>
                    <v-col>
                        <v-img :src="images['voteImage']"></v-img>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h3>Новый сценарий успешно создан</h3>
                        </v-row>
                        <v-row>
                            <h3>{{NameJsonFile}}</h3>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <NuxtLink to="/">
                    <v-btn>Publish</v-btn>
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

export default{
  name:"FinalScreen",
  components:['~/components'],
  data(){
    return{
      NameJsonFile:"Name_of_json.json",
      images
    }
  }
}
</script>
