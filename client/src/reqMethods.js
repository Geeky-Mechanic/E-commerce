import axios from 'axios';

const BASE_URL = "http://192.168.0.113:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDQ5Yzc1Y2RkZWM5ZmJhMTZkZDMwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODcyNTkzOSwiZXhwIjoxNjQ4OTg1MTM5fQ.cY23F_vV_nZBVZ61nb2D3nZyktF6j0IxPVwEkueok8Y";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const preq = (url) => axios.get(BASE_URL + url) ;

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`},
});