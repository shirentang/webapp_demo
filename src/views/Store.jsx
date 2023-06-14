import React,{useEffect} from "react";
import { connect } from "react-redux";
import action from "../store/action";
import NewsItem from '../components/NewsItem'
import { styled } from "styled-components";
import NavBarAgain from "../components/NavBarAgain";
import { SwipeAction,Toast } from "antd-mobile";
import SkeletonAgain from "../components/SkeletonAgain";
import api from "../api";


const StoreBox = styled.div`
    .box {
        padding:30px;
    }
`;

const Store = function Store(props){
    let {list: storeList, queryStoreListAsync, removeStoreListById}=props;

    useEffect(()=>{
        //第一次加载完后，redux没有收藏列表就异步派发
        if(!storeList) queryStoreListAsync();
    },[])

    const handleRemove= async (id)=>{
        try {
            let {code} = await api.storeRemove(id);
            if(+code !== 0){
                Toast.show({
                    icon:'fail',
                    content:'移除失败'
                })
                return
            }
            Toast.show({
                icon:'success',
                content:'移除成功'
            });
            removeStoreListById(id);
        } catch (error) {
            
        }
    }
    return (
        <StoreBox>
        <NavBarAgain title="我的收藏" />
        {storeList ?
            <div className="box">
                {storeList.map(item => {
                    let { id, news } = item;
                    return <SwipeAction key={id} rightActions={[{
                        key: 'delete',
                        text: '删除',
                        color: 'danger',
                        onClick: handleRemove.bind(null, id)
                    }]}>
                        <NewsItem info={news} />
                    </SwipeAction>;
                })}
            </div> :
            <SkeletonAgain />
        }
    </StoreBox>
    )
};
export default connect(
    state=>state.store,
    action.store
)(Store);