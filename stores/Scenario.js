import { defineStore } from 'pinia'

export const useSaveScenario = defineStore('Scenario', {
    state: () => {
        return {
            task_type: "",
            device_id:"",
            country:"",
            language:"",
            task_tesseractspi:[]
        }
    },
    getters: {
        getHeader:(state) => state.country+state.device_id+state.language+
            state.task_type,

        getTaskTesseractspi:(state)=> state.task_tesseractspi
    },

    actions: {
    },
})

