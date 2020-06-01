import axios from "axios";
import { Message } from "element-ui";
// 创建axios实例
// http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 5000
});

service.interceptors.request.use( 
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// Add a response interceptor
service.interceptors.response.use(
  function(response) {
    console.log(response);
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default service;

/**
 * 使用export default时
 * 引用 import 不需要花括号 但不能同时出现多个export default
 */
