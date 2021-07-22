'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // filenameHashing: false, 文件不带hash
    productionSourceMap: false,

    devServer: {
        // proxy: 'http://a.b.com'
    },

    configureWebpack: {
        /*(config) => {
            config.output.filename = 'static/js/[name].[hash].js'; // 入口文件chunk的命名
            config.output.chunkFilename = 'static/js/[name].[hash].js'; // 除入口文件外的chunk的命名
        }*/
        
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'Blog',
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        },
        externals: {
            'vue': 'Vue',
            'element-plus': 'ElementPlus',
        },
    },
};
