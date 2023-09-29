import {defineStore} from 'pinia'

export const useLineId = defineStore('lineId', {
    state: () => {
        return {
            lineId: 0,
            task: "",
            task_command: "",
            tech_comment: null, // Optional
            path: null, // Use not in everyone
            OpenCV_device_id: null, // Use not in everyone
            count_repeat: null,
            screenshot_cropping: null, // Use not in everyone
            target_text: null, // Use not in everyone
            tap_target_text: null // Use not in everyone
        }
    },
    getters: {
        getLineNum:(state)=> state.lineId,

        getLineId: (state) =>{
            return '"line_id": ' + state.lineId + '~ "task": ' + state.task + '~ ' +
                '"task_command": ' + state.task_command  + (state.tech_comment ? '~ "tech_comment": '+state.tech_comment : "");
        },

    getLineIdScreen: (state) => {

            return  '"line_id": ' + state.lineId + '~ "task": ' + state.task + '~ ' +
                '"task_command": ' + state.task_command + (state.tech_comment ? '~ "tech_comment": '+state.tech_comment : "") +
             (state.path ? '~ "path": "' + state.path + '"' : "");

    },

    getLineIdScreenOption: (state) => {

        return  '"line_id": ' + state.lineId + '~ "task": ' + state.task + '~ ' +
            '"task_command": ' + state.task_command + (state.tech_comment ? '~ "tech_comment": '+state.tech_comment : "") +
             (state.path ? '~ "path": "'+ state.path + '"' : "") + (state.OpenCV_device_id ? '~ "OpenCV_device_id": ' + state.OpenCV_device_id : "") +
             (state.count_repeat ? '~ "count_repeat": ' + state.count_repeat : "") +
            (state.screenshot_cropping ? '~ "screenshot_cropping": '+state.screenshot_cropping : "") +
             (state.target_text ? '~ "target_text": ' + state.target_text : "") +
             (state.tap_target_text ? '~ "tap_target_text": ' + state.tap_target_text : "");

        }
    },
    actions:{
        increment(){
            this.lineId++;
        },
        decrement(){
            this.lineId--;
        },
        newValueLineId(new_value){
            this.lineId = new_value;
        },
    }
});
