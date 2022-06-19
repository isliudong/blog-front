import * as types from "../types";


const website = {
    state: {},
    mutations: {
        [types.SAVE_WEB_CONFIG](state: any, configData: object | any) {
            for (const prop in configData) {
                state[prop] = configData[prop];
            }
        }
    },
    actions: {}
};

export default website;
