const path = require("path");
// 定义压缩文件类型
// const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
  return path.join(__dirname, dir);
}
// const proxyTargetMap = {
//   prod: "https://xxx.xxx.com/",
//   randy: "http://47.105.71.81:3306",
//   peter: "http://192.168.11.178:3001"
// };
// let proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.prod;
// 基本路径
// let publicPath = process.env.NODE_ENV === "production" ? "" : "/";
// let outputDir = process.env.NODE_ENV === "production" ? "dist" : "devdist";
// let dllPublishPath = "/vendor";
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  // 放置静态资源的地方 (js/css/img/font/...)
  // assetsDir: "",
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  //   chainWebpack: (config) => {

  //   },
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "vue": "vue/dist/vue.js",
        "@": path.resolve(__dirname, "./src"),
        "public": path.resolve(__dirname, "./public"),
        "components": path.resolve(__dirname, "./src/components"),
        "views": path.resolve(__dirname, "./src/views")
      }
    };
  },
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    /* string or regex */
  ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: config => {
    // 移除 prefetch 插件,解决组件懒加载失效的问题
    config.plugins.delete("prefetch");
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule("svgIcon")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .tap(options => {
        options = {
          symbolId: "icon-[name]"
        };
        return options;
      });

    // 原有的svg图像处理loader添加exclude
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: true,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      scss: { 
        prependData: `@import "./src/assets/style/main.scss";`
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    public: '192.168.7.198:8080',
    disableHostCheck: true,
    open: false, // 编译完后是否打开网页
    // host: '192.168.7.198', // 指定使用地址，默认localhost，0.0.0.0代表可以被外界访问
    // port: 8080,
    https: false, // 编译失败时刷新页面
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      "/devApi": {
        target: "http://www.web-jshtml.cn/dependenciesapi", // api服务器上的 地址
        changeOrigin: true,
        pathRewrite: {
          "^/devApi": ""
        }
      }
    },
    before: app => {}
  },

  // 第三方插件的选项
  pluginOptions: {}
};
