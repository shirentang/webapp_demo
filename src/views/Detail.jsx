import React, { useEffect, useState, useMemo } from "react";
import { Badge, Toast } from "antd-mobile";
import {
  LeftOutline,
  MessageOutline,
  LikeOutline,
  StarOutline,
  MoreOutline,
} from "antd-mobile-icons";
import "./Detail.less";
import api from "../api";
import SkeletonAgain from "../components/SkeletonAgain";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import action from "../store/action";

const Detail = function Detail(props) {
  //获取新闻

  let { navigate, params } = props;
  let [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);

  //第一次渲染完，获取数据

  //link写外面方便useeffect删除多余css
  let link;

  //设置处理css与图片
  const handleStyle = (result) => {
    let { css } = result;
    if (!Array.isArray(css)) return;
    css = css[0];
    if (!css) return;
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
  };

  const handleImage = (result) => {
    let imgPlaceHolder = document.querySelector(".img-place-holder");
    if (!imgPlaceHolder) return;
    //创建图片并插入
    let tempImg = new Image();
    tempImg.src = result.image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    };
  };

  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryNewsInfo(params.id);

        //添加css时因为setinfo是异步的，所以在这里直接处理样式和图片无效
        //先用flushSync来处理也不行，因为他们不是处于同一个闭包函数里面，可以用在这里用传参数来在info插入前解决，也可以用useEffect来控制

        flushSync(() => {
          setInfo(result);
          handleStyle(result);
        });

        handleImage(result);
      } catch (error) {}
    })();

    //return销毁样式
    return () => {
      if (link) document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);
        setExtra(result);
      } catch (error) {}
    })();
  }, []);

  //登陆和收藏
  let {
    base: { info: userInfo },
    queryUserInfoAsync,
    location,
    store: { list: storeList },
    queryStoreListAsync,
    removeStoreListById,
  } = props;

  useEffect(() => {
    //第一次渲染完：如果userInfo不存在，就派发登陆者信息,请求返回后info还不存在就说明未登陆
    (async () => {
      if (!userInfo) {
        let { info } = await queryUserInfoAsync();
        userInfo = info;
      }

      //如果已经登陆&&且没有收藏列表信息：派发任务同步到收藏列表
      if (userInfo && !storeList) {
        queryStoreListAsync();
      }
    })();
  }, []);

  //依赖于收藏列表和路径参数，判断是否收藏
  const isStore = useMemo(() => {
    if (!storeList) return false;
    return storeList.some((item) => {
      return +item.news.id === +params.id;
    });
  }, [storeList, params]);

  const handleStore = async () => {
    if (!userInfo) {
      //未登陆
      Toast.show({
        icom: "fail",
        content: "请先登录",
      });
      navigate(`/login?to=${location.pathname}`, { replace: true });
      return;
    }
    //已登陆->收藏/移除收藏
    if (isStore) {
      //移除收藏
      let item = storeList.find((item) => {
        return +item.news.id === +params.id;
      });
      if (!item) return;
      let { code } = await api.storeRemove(item.id);
      if (+code !== 0) {
        Toast.show({
          icon: "success",
          content: "移除失败",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "移除成功",
      });
      removeStoreListById(item.id);
      return;
    }

    //收藏
    try {
      let { code } = await api.store(params.id);
      console.log(await api.store(params.id));
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "收藏失败",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "收藏成功",
      });
      //同步收藏列表到redux
      queryStoreListAsync();
    } catch (error) {}
  };

  return (
    <div className="detail-box">
      {/* 新闻内容 */}
      {!info ? (
        <SkeletonAgain />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: info.body,
          }}
        ></div>
      )}

      {/* 底部图标 */}
      <div className="tab-bar">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content={extra ? extra.comments : 0}>
            <MessageOutline />
          </Badge>
          <Badge content={extra ? extra.popularity : 0}>
            <LikeOutline />
          </Badge>
          <span className={isStore ? "stored" : ""} onClick={handleStore}>
            <StarOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => {
    return {
      base: state.base,
      store: state.store,
    };
  },
  { ...action.base, ...action.store }
)(Detail);
