import React from "react"
import ReactDOM from 'react-dom/client'

import 'lib-flexible'
import './index.less'
// css in jsx 不生效
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="box">
        123
    </div>
)