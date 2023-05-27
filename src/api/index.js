import vAxios from "./axios";

//获取今日新闻信息
const queryNewsLatest = ()=>{
    return vAxios.get('/api/news_latest')
}

//获取往日新闻信息
const queryNewsBefore=(time)=>{
    return vAxios.get(`/api/news_before?${time}`)
}

//获取新闻详情信息
const queryNewsInfo = (id) =>{
    return vAxios.get(`/api/news_info?${id}`)
}

//获取新闻点赞信息
const queryStoryExtra = (id) =>{
    return vAxios.get(`/api/story_extra?${id}`)
}


const api = {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsInfo,
    queryStoryExtra
}

export default api