import { defineStore } from 'pinia'

export const useVariantsScreenType = defineStore('variantsScreenType', {
    state: () => {
        return {
            check_text: [],
            check_text_button: "",
            task_bufferspi_screen: []
        }
    },
    getters: {
        getHeaderVariantsScreenType: (state) => state.check_text+state.check_text_button,
        getTaskBufferspi:(state) => state.task_bufferspi
    },
    actions:{
        addCheckText:(state,value) =>
            state.check_text.push(value),
    }
});