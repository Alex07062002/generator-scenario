import { defineStore } from 'pinia'

export const useScreenJson = defineStore('screenJson', {
    state: () => {
        return {
            type_json_object: "json screen object",
            screen_type: null, //TODO How complete name screen_type
            variants_screen_type: [],
            currentLineIdInObjectScreen: 0,
            numberOfObjectInList: 1,
            nestedJsonObjects:[]
        }
    },
    getters: {
        getHeaderScreenJson: (state) => state.type_json_object+state.screen_type,
        getVariantsScreenType:(state) => state.variants_screen_type,
        getCurrentLineId:(state) => state.currentLineIdInObjectScreen
    },
    actions: {
        incrementScreen(){
            this.currentLineIdInObjectScreen++;
        },
        decrementScreen(){
            this.currentLineIdInObjectScreen--;
        },
        newValueCurrentLineId(new_value){
            this.currentLineIdInObjectScreen = new_value;
        }


    }
});