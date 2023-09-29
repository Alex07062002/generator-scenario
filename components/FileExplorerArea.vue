<template>
  <div style="border-style:solid">
<input type="file" ref="doc" @change="readJson()" />
</div>
</template>

<script>
import {mapActions, mapWritableState} from "pinia";
import {useNameJsonFile} from "~/stores/NameJsonFile.js";
import {useSaveScenario} from "~/stores/Scenario.js";
import {readFileIntoMemory} from "~/stores/readFileIntoMemory.js"

export default {
  name:"",
  props:['updateFile'],
  data(){
    return{
     file: null,
    }
  },
  setup(){
    const store = useSaveScenario();
    return {store};
  },
  methods: {
    ...mapWritableState(useSaveScenario,['taskTypeName','deviceIdName','countryName','languageName','taskTesseractspi']),
    ...mapActions(useSaveScenario,['$patch']),
    ...mapWritableState(useNameJsonFile, ['nameJsonFile']),
    ...mapActions(useNameJsonFile, ['$emit']),
    readJson() {
      let obj = null;
      this.file = this.$refs.doc.files[0];
      if (this.file.name.includes(".json")) {
       readFileIntoMemory(this.file, function (fileInfo) {
         obj = JSON.parse(new TextDecoder().decode(fileInfo.content));
         sessionStorage.setItem('file', JSON.stringify(obj)); //TODO change this solution (save data when reload browser)
       });
       obj = JSON.parse(sessionStorage.getItem('file'));
       sessionStorage.removeItem('file');
       this.$patch({
         taskTypeName: obj.task_type,
         deviceIdName: obj.device_id,
         countryName: obj.country,
         languageName: obj.language,
         taskTesseractspi: obj.task_tesseractspi
       });
        this.updateFile({
          nameJsonFile: this.file.name
        });
      }
    },
  },
};
</script>

