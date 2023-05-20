import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import routes from "./routes";

//统一路由配置
const Element = function Element(props) {
    let {component:Component}=props;
    
    //获取路由信息，基于属性传递给组件
    
    return <Component />
};

export default function RouterView() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        {routes.map((item) => {
          let { name, path } = item;
          return (
            <Route key={name} path={path} element={<Element {...item} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
