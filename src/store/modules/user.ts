import * as types from "../types";

export interface User {
    id: string;
    username: string;
    token: string;
    avatar: string;
    role: string;
}

const initPageState = () => {
    return {
        userInfo: {
            id: "",
            username: "",
            token: "",
            avatar: "",
            role:""
        }
    };
};
const user = {
    state: initPageState(),
    mutations: {
        [types.SAVE_USER](state: User | any, pageState: object | any) {
            for (const prop in pageState) {
                state[prop] = pageState[prop];
            }
        }
    },
    actions: {}
};

export default user;
