import React, { useState, useEffect,useRef } from "react";
import HomeHead from "../components/HomeHead";
import _ from "../assets/utils";
import { Swiper, Image, Divider, DotLoading,SafeArea } from "antd-mobile";
import { Link } from "react-router-dom";
import api from "../api";
import NewsItem from "../components/NewsItem";
import SkeletonAgain from "../components/SkeletonAgain";

import "./Home.less";


const Home = function Home() {
  //创建状态
  let [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}")),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([]);
  let loadMore=useRef();

  //第一次渲染完后向服务器发送请求
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        newsList.push({
          date,
          stories,
        });
        setNewsList([...newsList]);
      } catch (_) {}
    })();
  }, []);

  //第一次渲染完设置监听器，实现触底加载,组件释放时候记得移除设定的事件
  useEffect(()=>{
    let ob =new IntersectionObserver(async (changes)=>{
      let {isIntersecting}=changes[0]
      if(isIntersecting){
        //加载更多的按钮出现在窗口中,执行以下行为
        try {
          let time = newsList[newsList.length-1]['date'];
          let res = await api.queryNewsBefore(time);
          newsList.push(res);
          setNewsList([...newsList]);
        } catch (_) {}        
        
      }
    })
    let loadMoreBox =loadMore.current;
    ob.observe(loadMore.current)
    

    //return会在组件释放的时候执行
    return ()=>{
      ob.unobserve(loadMoreBox);
      ob=null
    }
  },[])

  //处理时间

  return (
    <div className="home-box">
      {/* 头部 */}
      <HomeHead today={today} />

      {/* 轮播图 */}
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper autoplay={true} loop={true}>
            {bannerData.map((item) => {
              let { id, image, title, hint } = item;
              return (
                <Swiper.Item key={id}>
                  <Link
                    to={{
                      pathname: `/detail/${id}`,
                    }}
                  >
                    <Image src={image} lazy />
                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>

      {/* 新闻列表 */}
      {newsList.length === 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {newsList.map((item, index) => {
            let { date, stories } = item;
            return (
              <div className="news-box" key={date}>
                {index !== 0 ? (
                  <Divider contentPosition="left">
                    {_.formatTime(date, "{1}月{2}日")}
                  </Divider>
                ) : null}
                <div className="list">
                  {stories.map((cur) => {
                    return <NewsItem key={cur.id} info={cur} />;
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* 加载更多的盒子（intersectionobsever） */}
      <div className="loadmore-box" ref={loadMore} style={{display:newsList.length === 0? 'none':'block'}}>
        <DotLoading />
        数据加载中
      </div>

     {/* 安全区 */}

      <SafeArea position="bottom"/>
    </div>

    
  );
};
export default Home;
