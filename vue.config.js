'use strict';

const name = 'AMS - Animation.Moive.Summary';
const outputDir = 'dist';

const path = require('path');
const resourceConfig = require('./src/config/resource.js');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const BundleAnalyzer = WebpackBundleAnalyzer.BundleAnalyzerPlugin;

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
    outputDir,
    assetsDir: 'static',
    // filenameHashing: false, 文件不带hash
    productionSourceMap: false,

    devServer: {
        proxy: {
            '/resource': {
                target: 'http://mobbbb.top',
                changOrigin: true,
            },
        },
    },

    configureWebpack: (config) => {
        // config.output.filename = 'static/js/[name].[hash].js'; // 入口文件chunk的命名
        // config.output.chunkFilename = 'static/js/[name].[hash].js'; // 除入口文件外的chunk的命名
        if (process.env.NODE_ENV === 'production') { // 打包时使用cdn
            config.externals = {
                'vue': 'Vue',
                'element-plus': 'ElementPlus',
            }

            config.plugins.push(
                new PrerenderSPAPlugin({
                    // Required - The path to the webpack-outputted app to prerender.
                    staticDir: path.join(__dirname, outputDir),
                    // Optional - The path your rendered app should be output to.
                    // (Defaults to staticDir.)
                    outputDir: path.join(__dirname, outputDir),
                    // Required - Routes to render.
                    routes: ['/'],
                    renderer: new Renderer({
                        headless: false,
                        renderAfterTime: 5000
                    }),
                    server: {
                        proxy: {
                            '/resource': {
                                target: 'http://mobbbb.top',
                                changOrigin: true,
                            },
                        },
                    },
                }),
            )
        }
        
        return {
            resolve: {
                alias: {
                    '@': resolve('src'),
                }
            },
        }
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'analyz') {
            config.plugin('webpack-bundle-analyzer').use(BundleAnalyzer)
        }
        if (process.env.NODE_ENV === 'production') {
            // 生产环境下注入在html模板注入cdn
            config.plugin('html').tap(args => {
                args[0].title= name
                args[0].resourceConfig = resourceConfig
                return args
            })
        }
    },
};
