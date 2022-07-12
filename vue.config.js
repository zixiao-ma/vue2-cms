const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,
        https: false,
        port: 9999,
        host: 'localhost',
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_CROSS_ADDRESS,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    }
})
