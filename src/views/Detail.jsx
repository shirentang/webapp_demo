import React, { useEffect, useState } from "react";
import { Badge } from "antd-mobile";
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


const Detail = function Detail(props) {
  let { navigate, params } = props;
  let [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);

  //第一次渲染完，获取数据

  //link写外面方便useeffect删除多余css
  let link;

  //设置处理css与图片
  const handleStyle=(result)=>{
    let { css }=result;
    if(!Array.isArray(css)) return;
    css = css[0];
    if(!css) return;
    link=document.createElement('link');
    link.rel="stylesheet";
    link.href=css;
    document.head.appendChild(link)
  }


  const handleImage=(result)=>{
    let imgPlaceHolder=document.querySelector('.img-place-holder');
    if(!imgPlaceHolder) return;
    //创建图片并插入
    let tempImg =new Image;
    tempImg.src=result.image;
    tempImg.onload=()=>{
        imgPlaceHolder.appendChild(tempImg)
    }
    tempImg.onerror=()=>{
        let parent = imgPlaceHolder.parentNode;
        parent.parentNode.removeChild(parent)
    }
  }
  

  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryNewsInfo(params.id);
        
        //添加css时因为setinfo是异步的，所以在这里直接处理样式和图片无效
        //先用flushSync来处理也不行，因为他们不是处于同一个闭包函数里面，可以用在这里用传参数来在info插入前解决，也可以用useEffect来控制
        
        flushSync(()=>{
            setInfo(result);
            handleStyle(result);
        })
  
        handleImage(result);
      } catch (error) {}
    })();


    //return销毁样式
    return ()=>{
        if(link) document.head.removeChild(link);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);
        setExtra(result);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="detail-box">
      
      {/* 新闻内容 */}
      {!info?<SkeletonAgain />:
      <div className="content" dangerouslySetInnerHTML={{
        __html:info.body
      }}>
      </div>
      }
      
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
          <Badge content={extra?extra.comments:0}>
            <MessageOutline />
          </Badge>
          <Badge content={extra?extra.popularity:0}>
            <LikeOutline />
          </Badge>
          <span>
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
export default Detail;
