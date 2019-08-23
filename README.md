#  项目说明文档
## 项目简介
+ 项目名称：艾卡西亚
    + 灵感来源于LOL英雄联盟的背景故事。虚空之地艾卡西亚的起源，令人无法想象的恐惧
    + 梗：艾卡西亚的暴雨
-------------------------------------------------------------------------------

## 项目结构说明
### 整体目录结构
```
├── build                               // 构建相关  
│   ├── build.js                        // webpack的打包文件,通过配置package.json中的script来执行脚本
│   ├── check-versions.js               // 检查node+npm的版本
│   ├── utils.js                        // vue开发环境的wepack相关配置文件
│   ├── filvue-loader.conf.js           // 处理.vue文件的配置文件
│   ├── webpack.base.conf.js            // 项目打包配置的基础文件
│   ├── webpack.dev.conf.js             // dev环境的配置文件(测试环境的可以再加)
│   ├── webpack.prod.conf.js            // prod环境的配置文件
├── config                              // 配置相关
│   ├── dev.env.js                      // dev环境的配置文件 build目录中的dev配置文件会引用
│   ├── index.js                        // 默认是本地的配置文件
│   ├── prod.env.js                     // prod环境的配置文件 同dev
│   ├── sit.env.js                      // sit环境的配置文件
├── src                                 // 源代码
│   ├── api                             // 所有请求
│   ├── assets                          // 主题 字体等静态资源
│   ├── components                      // 全局公用组件
│   ├── directive                       // 全局指令
│   ├── filtres                         // 全局 filter
│   ├── icons                           // 项目所有 svg icons
│   ├── lang                            // 国际化 language
│   ├── mock                            // 项目mock 模拟数据
│   ├── router                          // 路由
│   ├── store                           // 全局 store管理
│   ├── styles                          // 全局样式
│   ├── utils                           // 全局公用方法
│   ├── vendor                          // 公用vendor
│   ├── views                           // view  这里面是vue各种组件的demo例子 可以参考开发  后续上线删除
│   ├── eviews                          // eview 业务的vue组件全部写在这里面
│   ├── App.vue                         // 入口页面
│   ├── main.js                         // 入口 加载组件 初始化等
│   └── permission.js                   // 权限管理
├── static                              // 第三方不打包资源
│   └── Tinymce                         // 富文本
├── .babelrc                            // babel-loader 配置
├── eslintrc.js                         // eslint 配置项
├── .gitignore                          // git 忽略项
├── favicon.ico                         // favicon图标
├── index.html                          // html模板
└── package.json                        // package.json
```
+ views:      框架自带的vue组件demo 可以参考开发
+ eviews:     放置业务组件 根据业务来划分具体细分的业务   后续业务开发可以参考views的目录结构（详细参考./views/dashboard目录下的结构）
+ api:        一般放置通用的js文件
+ components: 这里的 components 放置的都是全局公用的一些组件，如上传组件，富文本等等。
+ 其他配置文件: 其他配置文件都有作用备注。。。请自行查看，不懂得google哦

-------------------------------------------------------------------------------

## 开发规范配置
###开发环境配置
+ 默认已经安装好vue基础开发环境，如果未安装，请参考下方教程
    + 你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。
    + 自行 google *node*和*vue*的安装教程 -- ☺☺

### ESLint插件应用
+ 为了规范代码规范，请务必进行下方的配置（保证代码风格统一）
+ 安装ESLint插件 直接Webstorm安装（easy的很）
+ webstorm（2019）配置eslint规范（其他版本的webstorm请自行google）
    + [eslint规范配置教程](https://blog.csdn.net/siyi_blog/article/details/89489832)
    + [设置eslint格式化快捷键](https://www.cnblogs.com/jingxuan-li/p/10929868.html)

-----------------------------------------------------------------------------

## 构建打包说明
+ 本地开发构建
    ```
    # 克隆项目
    git clone https://github.com/Kobe10/Acacia.git
    
    # 切换到工作目录
    cd /Acacia
    
    # 安装项目依赖文件
    npm install
    
    # 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
    npm install --registry=https://registry.npm.taobao.org
   
    # 本地开发
    npm run dev
    
    ``` 
+ 打开本地链接: [http://localhost:9526/](http://localhost:9526/)

+ *测试环境、正式环境部署操作 （后续操作）*
    ```
    #测试环境打包发布
    npm run build:prod
    
    #正式环境打包发布
    npm run build:sit
    ```
+ 其它

    ```bash
    # 预览发布环境效果
    npm run preview
    
    # 预览发布环境效果 + 静态资源分析
    npm run preview -- --report
    
    # 代码格式检查
    npm run lint
    
    # 代码格式检查并自动修复
    npm run lint -- --fix
    ```    

-------------------------------------------------------------------------------

## 开发说明
###前言
+ 本项目搭建参考  [vue-element-admin](https://panjiachen.github.io/vue-element-admin)，为了快速上手开发，可以参考 ./README.zh-CN.md 这个文件
+ 框架使用文档  - [国内访问文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 文档（方便没翻墙的用户查看）

###
+ 功能配置
    ```
    #后续维护
    ```

+ 权限控制
    + 权限载入 [user.js](./src/store/modules/user.js)

    ```
      #权限载入  获取用户信息
      
    ```
+ 参数码表（码值翻译，后续可能会用到，翻译统一前端处理，后端无需处理）
    + 参数载入 [login.vue](./src/views/login/index.vue)
          
          ```
          # 在登录成功后触发代码表加载
          // 登录成功获取参数列表
          this.$store.dispatch('loadAppCfg').then(() => {
            this.loading = false
            this.$router.push({path: this.redirect || '/'})
          })
          # 在app.js中，由Action加载码表数据
          dAppCfg({commit}) {
              return new Promise((resolve, reject) => {
                queryAppCfg().then(data => {
                  commit('SET_APP_CFG', data.data)
                  resolve()
                }).catch(error => {
                  reject(error)
                })
              })
            }
          ```
+ 接口地址配置
    + 调用的服务地址 [api目录](./src/api)
      ```
          # 开发阶段地址特殊配置   这里只是参考  后续维护
          export function getServerUrl(url, withIp = false) {
            let result = process.env.BASE_API + url
            if (result.indexOf('?') < 0) {
              result = result + '?prjCd=' + PRJ_CD
            } else {
              result = result + '&prjCd=' + PRJ_CD
            }
            if (store.getters.token) {
              result = result + '&LOGIN_ACCEPT=' + store.getters.token
            }
            if (process.env.NODE_ENV === 'development' && withIp) {
              result = 'http://114.248.78.102:9100/' + result
            } else if (withIp) {
              const href = document.location.href
              result = href.substr(0, href.indexOf(process.env.BASE_API)) + result
            }
            return result
          }
    
          # 各个接口地址配置
          return request({
            url: '/common/data',
            method: 'post',
            data
          })
          
          # 各个发布环境前缀配置(config/sit.env.js)(config/prod.env.js), 注意 BASE_API的调整
          module.exports = {
            NODE_ENV: '"production"',
            ENV_CONFIG: '"sit"',
            BASE_API: '"/dljs"'
          }
      ```
       
##