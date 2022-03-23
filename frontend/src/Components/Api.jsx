import axios from "axios";
function ApiModule() {
  let accessToken = localStorage.getItem("accessToken");
  return axios.create({
    baseURL: "/api",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    withCredentials: true,
  });
}
export default ApiModule;
