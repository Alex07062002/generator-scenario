import { defineStore } from 'pinia'

export const useScreenJson = defineStore('screenJson', {
    state: () => {
        return {
            type_json_object: "json screen object",
            screen_type: "",
            variants_screen_type: [],
            currentLineIdInObject: 1,
            numberOfObjectInListScreen: 1,
            nestedJsonObjects:[]
        }
    },
    getters: {
        getHeaderScreenJson: (state) => state.type_json_object+state.screen_type,
        getVariantsScreenType:(state) => state.variants_screen_type
    },
    actions: {}
});