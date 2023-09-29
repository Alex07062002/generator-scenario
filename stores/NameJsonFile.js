import {defineStore} from "pinia";

export const useNameJsonFile = defineStore('jsonFile',{
    state:() => {
        return {
            nameJsonFile: ""
        }
    },
    getters: {
        getName: (state) => state.nameJsonFile,
    },
    actions:{
    }
})