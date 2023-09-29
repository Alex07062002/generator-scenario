import {defineStore} from "pinia";
import {ScenarioEntity} from "~/backend/Entity/scenario.entity";

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