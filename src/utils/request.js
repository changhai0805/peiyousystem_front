import axios from 'axios';
// import {getToken,removeToken,setLoginError} from "./auth";
// create an axios instance
const request = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 *10, // request timeout
  timeout: 10000 *10,
});
// request.interceptors.request.use(config => {
//   config.headers.token = getToken();
//   return config;
// });
// request.interceptors.response.use(response => {
//   if(response.data.code=='510'){
//     removeToken();
//     setLoginError(response.data.code)
//     location.reload();
//     // window.location.href = "http://localhost:9529/#/login"
//     // window.confirm("登录异常，请重新登录");
//   }
//   return response;
// });
export default request
