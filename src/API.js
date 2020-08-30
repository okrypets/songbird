import axios from "axios";

const proxy = 'https://cors-anywhere.herokuapp.com/';

const API = {
  "herokuapp": axios.create({
    baseURL: "https://song-bird-okrypets.herokuapp.com",
    responseType: "json"
  }),
  "xeno": axios.create({
    baseURL: `${proxy}https://www.xeno-canto.org/api/2`,
    responseType: "json"
  }),
  "flickr": axios.create({
    baseURL: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=47adb18f31b7a4cedd0dba1b1f372ff7&tag_mode=all&text=birds&extras=url_m&per_page=1&page=1&format=json&nojsoncallback=1&tags=',
    responseType: "json"
  })
} ;

export default API;