import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import cookieUtils from "./cookieUtils";
import config from "./config";

export interface ResponseData {
    code: number;
    data?: any;
    msg: string;
}

//console.log('import.meta.env: ', import.meta.env);

// 创建 axios 实例
let fileService: AxiosInstance | any;
let mode = import.meta.env.MODE;

fileService = axios.create({
    baseURL: config.baseFileURL, // api 的 base_url
    timeout: 50000 // 请求超时时间
});

// request 拦截器 axios 的一些配置
fileService.interceptors.request.use(
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
fileService.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 200) {
            console.log(res)
            const data: ResponseData = res.data
            if (data.msg != null) {
                ElMessage({
                    message: data.msg,
                    type: "error"
                });
                return null;
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

export default fileService;
