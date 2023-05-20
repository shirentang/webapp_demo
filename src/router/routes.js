import { lazy } from "react";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      tittle: "知乎日报-webapp",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: lazy(() => import("../views/Detail")),
    meta: {
      tittle: "新闻详情-知乎日报",
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: lazy(() => import("../views/Personal")),
    meta: {
      tittle: "个人中心-知乎日报",
    },
  },
  {
    path: "/store",
    name: "store",
    component: lazy(() => import("../views/Store")),
    meta: {
      tittle: "我的收藏-知乎日报",
    },
  },
  {
    path: "/update",
    name: "update",
    component: lazy(() => import("../views/Update")),
    meta: {
      tittle: "修改个人信息-知乎日报",
    },
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("../views/Login")),
    meta: {
      tittle: "登陆/注册-知乎日报",
    },
  },
  {
    path: "*",
    name: "404",
    component: lazy(() => import("../views/Page404")),
    meta: {
      tittle: "404页面-知乎日报",
    },
  },
];

export default routes;
