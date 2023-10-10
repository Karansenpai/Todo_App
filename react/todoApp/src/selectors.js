// selectors.js
import { selector } from 'recoil';
import { userInfo } from './assets/Atoms/userinfo';

export const getUsername = selector({
  key: 'getUsername',
  get: ({ get }) => {
    const user = get(userInfo);
    return user.username;
  },
});

export const getPassword = selector({
  key: 'getPassword',
  get: ({ get }) => {
    const user = get(userInfo);
    return user.password;
  },
});
