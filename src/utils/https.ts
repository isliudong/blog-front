import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import cookieUtils from "./cookieUtils";
import {ElMessage} from "element-plus";
import config from "./config";
import {getQueryObject} from "./utils";

export interface ResponseData {
    code: number;
    data?: any;
    msg: string;
}

//console.log('import.meta.env: ', import.meta.env);

// 创建 axios 实例
let service: AxiosInstance | any;
service = axios.create({
    baseURL: config.baseURL, // api 的 base_url
    timeout: 50000 // 请求超时时间
});

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (cookieUtils.getCookie("token") != null) {
            config.headers.Authorization = "Bearer " + cookieUtils.getCookie("token")
        }
        return config;
    },
    (error: any) => {
        // Do something with request error
        console.error("error:", error); // for debug
        Promise.reject(error);
    }
);


// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 200) {
            const data: ResponseData = res.data
            if (data.msg != null) {
                if (data.msg == "请登录") {
                    // 保存授权前的页面链接内容
                    let preventHistory: object = {
                        path: window.location.pathname,
                        query: getQueryObject(),
                    };
                    window.localStorage.setItem("oldPath", JSON.stringify(preventHistory))
                    window.location.href = "/login"
                }
                ElMessage({
                    message: data.msg,
                    type: "error"
                });
                return Promise.reject(new Error(res.data.msg || "Error"));
            }
            return data;
        } else {
            ElMessage({
                message: "服务出错！",
                type: "error"
            });
            return Promise.reject(new Error(res.data.msg || "Error"));
        }
    },
    (error: any) => {
        ElMessage({
            message: "系统错误，请联系管理员",
            type: "error"
        });
        Promise.reject(error)
    }
);

export default service;
