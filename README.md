知乎日报-webapp
  技术栈：create-react-app、React18、redux/react-redux/redux-toolkit、
  react-router-dom、axios、css-in-js、less、AntdMobile ...


从零开始构建React项目
    1.基于create-react-app创建工程化项目
         create-react-app
         yarn eject 暴露webpack配置
          修改脚手架配置
            + 配置less: less/less-loader@8
            + 配置axios,请求失败用antd弹窗报错
            + 配置别名 @符 代替 src目录
            + 配置浏览器兼容 package.json中的browserslist
            + 配置跨域代理 http-proxy-middleware
            + 配置客户端启动服务的信息
            + 配置REM响应式布局的处理(移动端): lib-flexible、postcss-pxtorem
            + 配置打包优化
            + ...    
    2.准备一些项目开发必备材料
        + publish下index.html的修改，图标的修改
        + src/api/http.js :对axios/fetch的二次封装
        + src/assets:
          1、reset.min.css清除浏览器默认样式
          2、images 静态资源图片
          3、utils.js 自己封装常用数据库（检测数据类型，设定有效期的localstorage存储，日期格式化之类的）
    3.配置好REM响应式布局&&样式处理
    4.配置路由管理
    5.配置redux架子
    6.其他的基础框架配置
    7.逐一开发项目，注意组件的抽离封装
    8.开发完毕后
        + 项目优化
        + 封装提取
        + 测试
        + 部署上线（阿里云服务器）

知乎日报-后端：zhihu_admin
  后端数据库借口分为两部分：
    1.从知乎官方辣去实时数据[新闻、新闻详情、评论数等]
    2.自己研发的个人中心系统[登陆/注册、发送验证码、个人信息获取和修改、收藏体系]
  后端技术栈：
    Node、Express
    数据存储：
    用json文件的方式代替专业数据库的存储。[现在主流的专业数据库：mongodb、MySQL]
  如何启动后段和配置修改：
    1.环境
    2.在package.json中，修改后端服务的配置项
        "config":{
            "server":7100,//后端启动服务器端口
            "secret":"ZFPX"，//JWT算法相关
            "maxAge":"7d"
        }
    3.API.txt文档
        code.txt 存储发送的手机验证码
    4.启动后端
        $ node server.js 启动后端（终端窗口关闭，启动的服务器会停止，pm2不会）
        ---
        $ pm2 start server.js --name zhihu 用pm2持久管理服务
    5.验证后端是否启动成功
        http://127.0.0.1:7100/news_latest 获取到数据说明启动成功