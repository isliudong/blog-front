/**
 * 自定义公共函数
 */
const cookieUtils =
    {
        /**
         * @name: 设置cookie值
         * @author: camellia
         * @date: 2020-12-28
         * @param:  key   string  cookie名称
         * @param:  value  any cookie值
         * @param:  days  number  cookie保存天数
         */
        setCookie(key: string, value: any, days = 7) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = key + "=" + value + "; " + expires + "; path=/;";
        },
        /**
         * @name: 获取cookie值
         * @author: camellia
         * @date: 2020-12-28
         */
        getCookie(cname: string) {
            const name = cname + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        /**
         * @name: 清除cookie值
         * @author: camellia
         * @date: 2020-12-28
         * @param:  cname   string  cookie名称
         */
        clearCookie(cname: string) {
            const d = new Date();
            d.setTime(-1);
            const expires = "expires=" + d.toUTCString();
            console.log(cname + "=''; " + expires)
            document.cookie = cname + "=''; " + expires + "; path=/;";
        },
    }

export default cookieUtils;
