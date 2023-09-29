import { defineStore } from 'pinia'

export const useSaveCountryLang = defineStore('saveCountryLang', {
    state: () => {
        return {
            country: "",
            language: ""
        }
    },
    getters: {
    },
    actions: {
    },
});

export const useSaveDeviceId = defineStore('saveDeviceId', {
    state: () => {
        return {
            device_id: "",
            option_device_id: ""
        }
    },
    getters: {
    },
    actions: {
    },
});

export const useSaveTaskType = defineStore('saveTaskType', {
    state: () => {
        return {
            task_type: "",
        }
    },
    getters: {
    },
    actions: {
    },
});