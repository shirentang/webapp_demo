import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"

//改变REM换算比例
import 'lib-flexible'

//配置antd-mobile的语法包，国际化处理
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'

//样式
import './index.less'


// css in jsx 不生效,webpack里的postcss-pxtorem无法处理。
// import styled from "styled-components";
// const StyleProvider = styled.div`
//     .box{
//         width:328px;
//         height:164px;
//         line-height:164px;
//         text-aligtn:center;
//         font-size:40px;
//         background:lightblue;
//     }
// `;


/* 处理最大宽度 */
(function () {
    const handleMax = () => {
      let html = document.documentElement,
        root=document.getElementById('root'),
        deviceW = html.clientWidth;
        root.style.maxWidth="750px";
        if(deviceW>=750){
            html.style.fontSize = '75px'
        }
    };
    handleMax();
    window.addEventListener("resize", handleMax);
  })();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
)