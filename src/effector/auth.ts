import $api, { API_URL } from "../http/index";
import { createStore, createEffect } from "effector";
import axios from "axios";
import Cookies from "js-cookie";

export const registration = createEffect(
  async ({ email = "", password = "" }) => {
    const res = await $api.post("/registration", { password, email });
    return res;
  }
);
export const login = createEffect(async ({ email = "", password = "" }) => {
  axios.defaults.withCredentials = true;
  const res = await axios.post(`${API_URL}/login`, { password, email });
  return res;
});
export const checkAuth = createEffect(async () => {
  // let config = {
  //     headers: {
  //         Authorization: `Bearer ${Cookies.get('refreshToken')}`
  //     }
  // }
  const res = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
  return res;
});

export const logout = createEffect(async () => {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("refreshToken")}`,
    },
  };
  await axios.get(`${API_URL}/logout`, config);
});

const setData = (data: any) => {
  if (data.accessToken) {
    // Cookies.set('refreshToken', data.refreshToken, { secure: true, sameSite: 'None' })
    window.localStorage.setItem("token", data.accessToken);
    window.localStorage.setItem("user", JSON.stringify(data.userData));
    return data.userData;
  }
};

const removeData = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  return {};
};

const user: any = localStorage.getItem("user");
export const $authStore = createStore({
  user: JSON.parse(user) || {},
  isAuth: localStorage.getItem("token"),
})
  .on(registration.doneData, (state, res) => ({
    ...state,
    user: setData(res.data),
    isAuth: "auth",
  }))
  .on(login.doneData, (state, res) => ({
    ...state,
    user: setData(res.data),
    isAuth: "auth",
  }))
  .on(logout, (state) => ({
    ...state,
    user: removeData(),
    isAuth: "",
  }))
  .on(checkAuth.doneData, (state, res) => ({
    ...state,
    user: setData(res.data),
  }));
