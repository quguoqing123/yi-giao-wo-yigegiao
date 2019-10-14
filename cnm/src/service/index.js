import axios from "axios";
let axiosIns = axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    let loginToken = sessionStorage.getItem("login_token");
    if (loginToken) {
      // console.log("tokensss", loginToken);
      // config.headers.Authorization = `Bearer ${loginToken}`;
      config.headers.Authorization = `${loginToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
export default {
  login(data) {
    return axios.post("/api/userlogin", data);
  },
  loginOut() {
    //退出登录时调用，销毁掉请求拦截器
    axios.interceptors.request.eject(axiosIns);
  }
};
