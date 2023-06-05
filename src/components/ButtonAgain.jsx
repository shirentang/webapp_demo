//封装Button，对不同场景设置不同的函数

import React,{useState} from "react";
import { Button } from "antd-mobile";

const ButtonAgain = function ButtonAgain(props) {

    //因为props是只读，深拷贝一份来进行修改
    let options = {...props}
    let {children,onClick: handle}=options
    delete options.children

    let [loading,setLoading]=useState(false);
    const clickHandle= async()=>{
        setLoading(true);
        try {
            await handle();
        } catch (error) {
        }
        setLoading(false)
    }
    if (handle) {
        options.onClick = clickHandle;
    }

    return (<Button {...options} loading={loading}>
        {children}
    </Button>)
}

export default ButtonAgain;