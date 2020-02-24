import axios from "axios";
/* 
const API_ROOT = window.location.host;
 */

const API_ROOT = "http://localhost:8000";

axios.defaults.baseURL = API_ROOT;

export const fetchusers = () => {
  return axios
    .get(`/users`)

    .then(res => res.data.data)

    .catch(function(error) {
      console.log(error);
    });
};

export const fetchrooms = () => {
  return axios
    .get(`/chatrooms`)

    .then(res => res.data.data)
    .catch(function(error) {
      console.log(error);
    });
};
