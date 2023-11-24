import {defineStore} from "pinia";

export const useImageState = defineStore('imageStore',{
    state:() => {
        return {
            nameFile: "",
            dataURL: "",
            multiplierPicture: 0,
        }
    },
    getters: {
        getNameFile: (state) => state.nameFile,
    }
})