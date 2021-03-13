import axios from "axios";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

export default axios.create({
  baseURL: API_URL + "/api",
  headers: {
    "Content-type": "application/json",
  },
});
