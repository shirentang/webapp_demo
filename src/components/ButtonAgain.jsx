import React,{useState} from "react";
import { Button } from "antd-mobile";

const ButtonAgain = function ButtonAgain(props) {

    //因为props是只读，深拷贝一份来进行修改
    let options = {...props}
    let {children,onClick: handle}=options
    delete options.children
    delete options.onClick

    let [Loading,setLoading]=useState(false);
    const clickHandle= async()=>{
        setLoading(true);
        await handle();
        setLoading(false)

    }

    return (<Button {...options} onClick={clickHandle} loading={Loading}>
        {children}
    </Button>)
}

export default ButtonAgain;