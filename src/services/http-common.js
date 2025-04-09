import Axios from "axios";

// const API_ENDPOINT = "http://localhost:3035/";
// const API_ENDPOINT = "https://lottoapi.pg-th.com/";
const API_ENDPOINT = "https://demoapi.laosspecialvip.com/";

export const HTTP = Axios.create({
  baseURL: API_ENDPOINT,
});
