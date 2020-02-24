import axios from "axios";
/* 
const API_ROOT = window.location.host;
 */

const API_ROOT = "http://localhost:5000";

axios.defaults.baseURL = API_ROOT;

export const fetchrooms = () => {
  return axios
    .get(`/api/rooms`)

    .then(res => res.data.data)
    .catch(function(error) {
      console.log(error);
    });
};
