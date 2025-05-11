import Axios from "axios";

// const API_ENDPOINT = "http://localhost:3035/";
// const API_ENDPOINT = "https://apiatb88.laosspecialvip.com/";
const API_ENDPOINT = "https://api.laosspecialvip.com/";

export const HTTP = Axios.create({
  baseURL: API_ENDPOINT,
});
