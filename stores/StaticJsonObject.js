import { defineStore } from 'pinia'

export const useStaticJson = defineStore('staticJson', {
    state: () => {
        return {
            type_json_object: "json static object",
            screen_type: "",
            task_bufferspi: [],
            currentLineIdInObject: 1,
            numberOfObjectInList: 1,
            nestedJsonObjects: []
        }
    },
    getters: {
        getHeaderStaticJson: (state) => state.type_json_object+state.screen_type,
        getTaskBufferspi:(state) => state.task_bufferspi
    },
    actions:{
    }
});