import React,{useState} from "react";
import HomeHead from "../components/HomeHead";
import _ from '../assets/utils'

const Home = function Home(){
    //创建状态
    let [today,setToday] = useState(_.formatTime(null,"{0}{1}{2}")) 



    return (
        <div className="home-box">
            <HomeHead today={today}/>
            
        </div>
    )
};
export default Home;