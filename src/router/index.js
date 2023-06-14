import React, { Suspense,useEffect,useState } from "react";
import { Routes, Route,useNavigate,useLocation,useParams,useSearchParams } from "react-router-dom";

import routes from "./routes";

import { Mask,SpinLoading,Toast } from 'antd-mobile'
import store from '../store'
import action from '../store/action'

//统一路由配置
const isCheckLogin=(path)=>{
  let { base:{info} } = store.getState();
  let checkList = ['/personal','/store','/update'];
  return (!info&&checkList.includes(path))
}

const Element = function Element(props) {
  let {component:Component,meta,path}=props;
  let isShow = !isCheckLogin(path)
  let [_,setRandom]=useState(0)
  

  //登陆态校验
  
  useEffect(()=>{
    if(isShow) return;
    (async ()=>{
    //如果info不存在，跳转的是需要登录的页面，引入action从服务器获取信息，检查获取状态后派发
      let infoAction = await action.base.queryUserInfoAsync();
      let info = infoAction.info;
      if(!info){
        //如果服务器没有跳转的信息，就跳转登陆页
        Toast.show({
          icon:'fail',
          content:'请先登陆'
        })
        
        navigate({
          pathname:'/login',
          search:`?to=${path}`
        },{replace:true})

        return;
      }
      //存在info就说明已经登陆，dispath到redux里
      store.dispatch(infoAction)
      setRandom(+new Date())
    })()
  })

    
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


  return <>
    {isShow?
      <Component navigate={navigate} location={location} params={params} usp={usp} />:
      <Mask visible={true}>
      <SpinLoading color='default' style={{ '--size': '48px' }} />
    </Mask> 
    }
  </>
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
