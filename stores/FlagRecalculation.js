import { defineStore } from 'pinia'

export const useFlagRecalculation = defineStore('recalculation', {
    state: () => {
        return {
            flag: false,
            startLineId: 0
        }
    },
    getters: {
        getRecalculation: (state) => state.startLineId+state.flag,
    },
    actions:{
    }
});