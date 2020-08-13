import axios from "axios";

export default axios.create({
  baseURL: "https://song-bird-okrypets.herokuapp.com",
  responseType: "json"
});