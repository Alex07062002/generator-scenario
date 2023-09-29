import { defineStore } from 'pinia'

export const useSaveScenario = defineStore('Scenario', {
    state: () => {
        return {
            taskTypeName: "",
            deviceIdName:"",
            countryName:"",
            languageName:"",
            taskTesseractspi:[]
        }
    },
    getters: {
        getHeader:(state) => state.countryName+state.deviceIdName+state.languageName+
            state.taskTypeName,

        getTaskTesseractspi:(state)=> state.taskTesseractspi
    },

    actions: {
    },
})

