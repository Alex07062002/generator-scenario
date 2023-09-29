<template>
  <v-col>
      <v-row>
        <v-textarea name="" v-model="techComment"  cols="30" rows="3"></v-textarea>
      </v-row>
    <v-row>
      <v-btn @click="saveTechComment">Сохранить</v-btn>
    </v-row>
  </v-col>
</template>

<script>
import {useLineId} from "~/stores/LineIdObject.js";
import {mapActions, mapWritableState} from "pinia";

export default{
  name:"TechComment",
  data(){
    return{
      techComment: this.storeLineId.tech_comment,
    }
  },
  setup(){
    const storeLineId = useLineId();
    return{ storeLineId}
  },
  methods:{
    ...mapWritableState(useLineId,["tech_comment"]),
    ...mapActions(useLineId,['$patch']),
    saveTechComment(){
      this.$patch({
        tech_comment: this.techComment
      });
    }
  }
}
</script>
