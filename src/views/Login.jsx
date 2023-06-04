import React,{useState} from "react";
import NavBarAgain from '../components/NavBarAgain'
import './Login.less'
import { Button, Form, Input,Toast } from "antd-mobile";
import ButtonAgain from "../components/ButtonAgain";

//表单校验规则
const validate = {
    phone(_,value){
        value=value.trim();
        let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
        if(value.length===0) return Promise.reject(new Error('手机号是必填项！'));
        if(!reg.test(value)) return Promise.reject(new Error('手机号格式有误！'));
        return Promise.resolve()
    },
    code(_,value){
        value=value.trim();
        let reg = /^\d{6}$/;
        if(value.length===0) return Promise.reject(new Error('验证码是必填项！'));
        if(!reg.test(value)) return Promise.reject(new Error('验证码格式有误！'));
        return Promise.resolve()
    }
}

const Login = function Login(){
    //状态
    const [formIns]=Form.useForm(),
        [disabled,setDisabled]=useState(false),
        [sendText,setSendText]=useState('发送验证码'),
        [sendLoading,setSendLoading]=useState(false),
        [submitLoading,setSubmitLoading]=useState(false)

    Toast.show({
        icon:'success',
        content:'123',
    })

    //表单提交
    const submit = (values)=>{
        
    }

    //发送验证码
    const send = async ()=>{
        try {
            await formIns.validateFields(['phone'])
            //手机号格式通过
        } catch (error) {

        }
    }


    return (
        <div className="login-box">
            <NavBarAgain title="登陆/注册" />
            <Form
                layout="horizontal"
                style={{'---border-top':'none'}}
                footer={

                    <ButtonAgain type="submit" color="primary">
                        提交
                    </ButtonAgain>
                }
                onFinish={submit}
                form={formIns}
                initialValues={{phone:'',code:''}}
            >
                <Form.Item name='phone' label='手机号' rules={[{validator:validate.phone}]}>
                    <Input placeholder="请输入手机号"/>
                </Form.Item>

                <Form.Item name='code' label='验证码' 
                rules={[{required:true,message:'验证码是必填项'},{validator:validate.code,message:'验证码格式有误'}]}
                    extra={
                        <Button size="samll" color="primart" 
                        disabled={disabled} 
                        loading={sendLoading}

                        onClick={send}>
                            发送验证码
                        </Button>
                    }
                >
                    <Input/>
                </Form.Item>

            </Form>
        </div>
    )
};
export default Login;