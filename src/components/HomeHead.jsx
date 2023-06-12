import React, { useEffect, useMemo } from "react";
import timg from "../assets/images/timg.jpg";
import { connect } from "react-redux";
import action from "../store/action";

import "./HomeHead.less";
import { useNavigate } from "react-router-dom";

const HomeHead = function HomeHead(props) {
  const navigate = useNavigate();

  //计算时间中的月和日
  let { today,queryUserInfoAsync,info } = props;
  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    let area = [
      "",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "十一",
      "十二",
    ];
    return {
      month: area[+month] + "月",
      day,
    };
  }, [today]);
  //第一次渲染完如果没有info信息就先派发一次

  useEffect(()=>{
    if(!info){
      queryUserInfoAsync()
    }
  },[])
  return (
    <header className="home-head-box">
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">知乎日报</h2>
      </div>

      <div className="picture"
        onClick={()=>{
          navigate('personal')
        }}
      >
        <img src={info?info.pic:timg} alt="" />
      </div>
    </header>
  );
};

export default connect(
  state=>state.base,
  action.base
)(HomeHead)
