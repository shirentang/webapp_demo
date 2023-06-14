import React from "react";
import NavBarAgain from "../components/NavBarAgain";
import ButtonAgain from '../components/ButtonAgain'
import { styled } from "styled-components";
import api from "../api";
import action from "../store/action";
import { Toast,Input,ImageUploader } from "antd-mobile";
import { connect } from "react-redux";


const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;

const Update = function Update(){
    return (
        <div className="update-box">
            修改个人信息
        </div>
    )
};
export default Update;