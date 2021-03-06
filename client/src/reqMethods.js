import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.currentUser)?.accessToken;
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: baseUrl,
});


export const userRequest = axios.create({
    baseURL: baseUrl,
    header: {token: `Bearer ${TOKEN}`},
});