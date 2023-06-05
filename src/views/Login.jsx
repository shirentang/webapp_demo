import React, { useState, useEffect } from "react";
import NavBarAgain from "../components/NavBarAgain";
import "./Login.less";
import { Form, Input, Toast } from "antd-mobile";
import ButtonAgain from "../components/ButtonAgain";
import api from "../api";

//引入具备有效期的localstorage
import _ from '../assets/utils'

//表单校验规则
const validate = {
  phone(_, value) {
    value = value.trim();
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (value.length === 0)
      return Promise.reject(new Error("手机号是必填项！"));
    if (!reg.test(value)) return Promise.reject(new Error("手机号格式有误！"));
    return Promise.resolve();
  },
  code(_, value) {
    value = value.trim();
    let reg = /^\d{6}$/;
    if (value.length === 0)
      return Promise.reject(new Error("验证码是必填项！"));
    if (!reg.test(value)) return Promise.reject(new Error("验证码格式有误！"));
    return Promise.resolve();
  },
};

const Login = function Login() {
  //状态
  const [formIns] = Form.useForm(),
    [disabled, setDisabled] = useState(false),
    [sendText, setSendText] = useState("发送验证码");

  //总表单提交
  const submit = async () => {
    try {
      await formIns.validateFields();
      let values =formIns.getFieldsValue()
      let { code:codeHttp,token } = await api.login(values.phone,values.code);
      if(+codeHttp !== 0 ){
        Toast.show({
            icon:'fail',
            content:'登陆失败'        
        })
        formIns.resetFields(['code'])
        return;
      }
      //登陆成功，存储token，登陆者信息，提示，跳转
      _.storage.set('tk',token);
      


    } catch (error) {}
  };

  //发送验证码
  let timer = null,
    num = 31;
  const countdown = () => {
    num--;
    if (num === 0) {
      clearInterval(timer);
      timer = null;
      setSendText("发送验证码");
      setDisabled(false);
      return;
    }
    setSendText(`${num}后重新发送`);
  };
  const send = async () => {
    try {
      await formIns.validateFields(["phone"]);
      //手机号格式通过
      let phone = formIns.getFieldValue("phone");
      let { code } = await api.sendPhoneCode(phone);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "发送失败",
        });
        return;
      }

      //发送成功

      //设为不可操作
      setDisabled(true);
      //开启计时器
      countdown();
      if (!timer) timer = setInterval(countdown, 1000);
    } catch (error) {}
  };

  //组件结束删除定时器
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);

  return (
    <div className="login-box">
      <NavBarAgain title="登陆/注册" />
      <Form
        layout="horizontal"
        style={{ "---border-top": "none" }}
        footer={
          <ButtonAgain color="primary" onClick={submit}>
            提交
          </ButtonAgain>
        }
        form={formIns}
        initialValues={{ phone: "", code: "" }}
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ validator: validate.phone }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="code"
          label="验证码"
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain
              size="samll"
              color="primary"
              disabled={disabled}
              onClick={send}
            >
              {sendText}
            </ButtonAgain>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
