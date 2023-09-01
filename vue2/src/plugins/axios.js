import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.example.com', // 根据实际情况修改为您的 API 地址
    timeout: 5000, // 根据实际情况修改请求超时时间
  });
  instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前可以做一些处理，如添加认证信息、请求头等
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 在收到响应数据前可以做一些处理，如解析响应数据、错误处理等
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // GET 请求封装
  export const get = (url, params) => {
    return instance.get(url, { params });
  };
  
  // POST 请求封装
  export const post = (url, data) => {
    return instance.post(url, data);
  };
  
  // PUT 请求封装
  export const patch = (url, data) => {
    return instance.patch(url, data);
  };
  
  export const put = (url, data) => {
    return instance.put(url, data);
  };
  
  // DELETE 请求封装
  export const del = (url) => {
    return instance.delete(url);
  };