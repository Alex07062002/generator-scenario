import { defineStore } from 'pinia'

export const useStaticJson = defineStore('staticJson', {
    state: () => {
        return {
            type_json_object: "json static object",
            screen_type: "",
            task_bufferspi: [],
            currentLineIdInObject: 0,
            numberOfObjectInList: 1,
            nestedJsonObjects: []
        }
    },
    getters: {
        getHeaderStaticJson: (state) => state.type_json_object+state.screen_type,
        getTaskBufferspi:(state) => state.task_bufferspi,
        getCurrentLineId:(state) => state.currentLineIdInObject
    },
    actions:{
        increment(){
            this.currentLineIdInObject++;
        },
        decrement(){
            this.currentLineIdInObject--;
        },
        newValueCurrentLineId(new_value){
            this.currentLineIdInObjectScreen = new_value;
        }
    }
});