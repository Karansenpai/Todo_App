import {atom} from "recoil"

export const userInfo= atom({
    key: 'userInfo', 
    default: {
        username: null,
        password: null,
        isLoading: true
    }, 
  });