interface Config {
    isDevMode: boolean;
    isTestMode: boolean;
    serverHost: string;
    host: string;
    fileServerHost: string;
    oauth_uri: string;
    baseURL:string;
    baseFileURL:string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
}

const config: Config = {
    isDevMode: false,
    isTestMode: false,
    baseURL: "/development",
    baseFileURL: "/development",
    fileServerHost: "http://localhost:8000",
    serverHost: "http://localhost:3000",
    host: "http://localhost:3000",
    oauth_uri: "https://github.com/login/oauth/authorize",
    redirect_uri: "http://150.158.17.182/qq/callback", // 请修改成你的信息
    client_id: "40cca80d10082a99e683", // 请修改成你的信息
    client_secret: "1bcc096ef149e5c0ff7649da0cde69fa8df01638" // 请修改成你的信息
};

// 本地开发环境下 （如下的信息在本地开发可以当测试用）
if (import.meta.env.MODE === "development") {
    config.isDevMode = true;
    config.baseURL="/development";
    config.baseFileURL= "/fileSever-dev";
    config.fileServerHost = "http://localhost:8000";
    config.serverHost = "http://localhost:3000";
    config.host = "http://localhost:3000";
    config.redirect_uri = "http://150.158.17.182/qq/callback";
    config.client_id = "40cca80d10082a99e683";
    config.client_secret = "1bcc096ef149e5c0ff7649da0cde69fa8df01638";
} else if (import.meta.env.MODE === "test") {
    config.isTestMode = true;
    config.baseURL="/test";
    config.baseFileURL= "/fileSever-dev";
    config.fileServerHost = "http://141.147.189.7:8211";
    config.serverHost = "http://localhost:3000";
    config.host = "http://localhost:3000";
    config.redirect_uri = "http://141.147.189.7/qq/callback";
    config.client_id = "40cca80d10082a99e683";
    config.client_secret = "1bcc096ef149e5c0ff7649da0cde69fa8df01638";
}else if (import.meta.env.MODE === "pro") {
    config.isTestMode = false;
    config.baseURL="/blog";
    config.baseFileURL= "/file-sever";
    config.fileServerHost = "https://panghucm.fun/file-sever";
    config.serverHost = "https://panghucm.fun/blog";
    config.host = "https://panghucm.fun";
    config.redirect_uri = "https://panghucm.fun/qq/callback";
    config.client_id = "40cca80d10082a99e683";
    config.client_secret = "1bcc096ef149e5c0ff7649da0cde69fa8df01638";
}
export default config;
