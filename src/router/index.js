import React, { Suspense } from "react";
import { Routes, Route,useNavigate,useLocation,useParams,useSearchParams } from "react-router-dom";

import routes from "./routes";

import { Mask,SpinLoading } from 'antd-mobile'

//统一路由配置
const Element = function Element(props) {
    let {component:Component,meta}=props;

    //获取meta里的title并修改页面title
    let {tittle = "知乎日报-WebApp"}=meta||{}
    document.title=tittle;

    //获取路由信息，基于属性传递给组件
    
    //根据路由跳转组件
    const navigate=useNavigate(),
    //获取跳转携带的stata信息
    location=useLocation(),
    //获取传参
    params=useParams(),
    //获取页面携带的哈希
    [usp]=useSearchParams();

    
    return <Component navigate={navigate} location={location} params={params} usp={usp} />
};

export default function RouterView() {
  return (
    <Suspense fallback={
    <Mask visible={true}>
      <SpinLoading color='default' style={{ '--size': '48px' }} />
    </Mask> 
    }>
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
