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
            deviceIdName: "",
            optionDeviceIdName: ""
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
            taskTypeName: "",
        }
    },
    getters: {
    },
    actions: {
    },
});