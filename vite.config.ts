import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/theme-chalk/${name}.css`;
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`;
                    },
                }
            ]
        })
    ],

    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: './',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    // outDir: 'dist',
    server: {
        fs: {
            strict: false
        },
        // hostname: '0.0.0.0',
        host: "localhost",
        port: 3000,
        // // 是否自动在浏览器打开
        // open: true,
        // // 是否开启 https
        // https: false,
        // // 服务端渲染
        // ssr: false,
        proxy: {
            '/development': {
                target: 'http://127.0.0.1:9090/',
                changeOrigin: true,
                ws: true,
                rewrite: (pathStr) => pathStr.replace('/development', '')
            },
            '/test': {
                target: 'http://快乐星球.site:9090/',
                changeOrigin: true,
                ws: true,
                rewrite: (pathStr) => pathStr.replace('/test', '')
            },
            '/fileSever-dev': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                ws: true,
                rewrite: (pathStr) => pathStr.replace('/fileSever-dev', '')
            },
            '/fileSever-tes': {
                target: "http://快乐星球.site:8211",
                changeOrigin: true,
                ws: true,
                rewrite: (pathStr) => pathStr.replace('/fileSever-tes', '')
            },
        },
    },
    resolve: {
        // 导入文件夹别名
        alias: {
            '@': path.resolve(__dirname, './src'),
            views: path.resolve(__dirname, './src/views'),
            components: path.resolve(__dirname, './src/components'),
            utils: path.resolve(__dirname, './src/utils'),
            less: path.resolve(__dirname, "./src/less"),
            assets: path.resolve(__dirname, "./src/assets"),
            com: path.resolve(__dirname, "./src/components"),
            store: path.resolve(__dirname, "./src/store"),
            mixins: path.resolve(__dirname, "./src/mixins")
        },
    }
})
