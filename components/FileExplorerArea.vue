<template>
  <div class="file-upload">
    <div class="file-upload__area">
      <v-btn @click="$refs.inputUpload.click()">Загрузить JSON файл</v-btn>
      <input v-show="false" ref="inputUpload" type="file" @change="readJson" />
    </div>
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
    const storeName = useNameJsonFile();
    return {store, storeName};
  },
  methods: {
    ...mapWritableState(useSaveScenario,['task_type','device_id','country','language','task_tesseractspi']),
    ...mapActions(useSaveScenario,['$patch']),
    ...mapWritableState(useNameJsonFile, ['nameJsonFile']),
    ...mapActions(useNameJsonFile, ['$emit']),
    async readJson() {
      let obj = null;
      this.file = this.$refs.inputUpload.files[0];
      this.storeName.$reset();
      this.store.$reset();
      if (this.file.name.includes(".json")) {
        const getdata = async () => {
          obj = await readFileIntoMemory(this.file).then(function (response) {
            return JSON.parse(new TextDecoder().decode(response));
          });
        };
        await getdata();
        this.$patch({
          task_type: obj.task_type,
          device_id: obj.device_id,
          country: obj.country,
          language: obj.language,
          task_tesseractspi: obj.task_tesseractspi
        });
        this.updateFile({
          nameJsonFile: this.file.name
        });
      }
    },
  },
};
</script>

<style lang="scss">
.file-upload {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 10px 10px 10px;
}
.file-upload .file-upload__area {
  width: 600px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
}
</style>