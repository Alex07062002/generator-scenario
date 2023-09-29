import { defineStore } from 'pinia'

export const useLineId = defineStore('lineId', {
    state: () => {
        return {
            lineId: 0,
            task: "",
            task_command: "",
            tech_comment: null, // Optional
            path: null, // Use not in everyone
            OpenCV_device_id: null, // Use not in everyone
            screenshot_cropping: null, // Use not in everyone
            target_text: null, // Use not in everyone
            tap_target_text: true // Use not in everyone
        }
    },
    getters: {
        getLineNum:(state)=> state.lineId,
        getLineId: (state) =>
            state.lineId+state.task+state.task_command+state.tech_comment
    },
    actions:{
    }
});
