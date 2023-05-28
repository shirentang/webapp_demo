import http from "./http";

//获取今日新闻信息
const queryNewsLatest = ()=>{
    return http.get('api/news_latest')
}

//获取往日新闻信息
const queryNewsBefore=(time)=>{
    return http.get(`/api/news_before?${time}`)
}

//获取新闻详情信息
const queryNewsInfo = (id) =>{
    return http.get(`/api/news_info?${id}`)
}

//获取新闻点赞信息
const queryStoryExtra = (id) =>{
    return http.get(`/api/story_extra?${id}`)
}


const api = {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsInfo,
    queryStoryExtra
}

export default api