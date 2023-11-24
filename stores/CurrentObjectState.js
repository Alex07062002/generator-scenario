import { defineStore } from 'pinia'

export const useCurrentObject = defineStore('currentObject', {
    state: () => {
        return {
            previewObject: 0,
        }
    },
    getters:{
        getCurrentObject:(state)=> state.currentObject,
    },
    actions:{
        decrementCurrent(){
            this.previewObject--;
        },
        incrementCurrent(){
            this.previewObject++;
        },
        currentObjectNewValue(new_value){
            this.previewObject = new_value;
        }
    }
});