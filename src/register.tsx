import React,{ Component } from 'react'
import styled from 'styled-components'
import {Button,Form, Input, message} from 'antd'
import { connect } from "react-redux";
import {changeUserState} from "./redux/reducer";
import axios from 'axios';



interface IProps {
    history:any,
    changeUserState:Function
}
interface IState {
    user:string,
    pwd:string,
    eMail:string
}
@connect(
    state => state,
    {changeUserState}
)
class Register extends Component<IProps,IState>{
    constructor(props:any){
        super(props);
        this.state = {
            user:'',
            pwd:'',
            eMail:''
        }
    }

    async onFinish(){
        let res = await axios.post('/api/register',this.state);
        if(res.status===201 && res.data.code===0){
            message.success("注册成功！请录入脸部信息！");
            this.props.changeUserState({user:res.data.user,auth:true,haveFaceData:0});
            return this.props.history.push('/check')
        }
        return message.error(res.data.msg)
    }

    render(){
        return(
                <RegisterFrame id={'loginFrame'}>
                    <Form
                        name="normal_login"
                        className="normal_register"
                        initialValues={{ remember: true }}
                    >

                        <Form.Item
                            name="nickname"
                            label={"　用户名"}
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input onChange={v=>this.setState({user:v.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="　E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input onChange={v=>this.setState({eMail:v.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="　　密码"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password onChange={v=>this.setState({pwd:v.target.value})}/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                id={"zhuce"}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={()=>this.onFinish()}
                            >注册
                            </Button>
                        </Form.Item>
                    </Form>
                </RegisterFrame>
        );
    }
}

const RegisterFrame = styled.div`
    position:absolute;
    width:34%;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    background-color:white;
    border:0.1rem solid white;
    border-radius:0.4rem;
    animation:bigger 0.3s linear 1;
    @keyframes bigger{
        0%{width:20%;opacity:0;}
        100%{width:34%;opacity:1;}
    }
    .normal_register{
        width:80%;
        margin:8% auto;
    }
    #zhuce{
        margin-left:80px;
    }
`;

export default Register;