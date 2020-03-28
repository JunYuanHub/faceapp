import React,{ Component } from 'react'
import styled from 'styled-components'
import {Button, Checkbox, Form, Input, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {changeUserState} from "./redux/reducer";
import axios from "axios";


interface Iprops {
    history:any,
    changeUserState:Function
}
interface Istate {
    user:string,
    pwd:string
}
@connect(
    state=>state,
    {changeUserState}
)
class Login extends Component<Iprops,Istate>{
    constructor(props:any){
        super(props);
        this.state = {
            user:'',
            pwd:''
        }
    };
    async onFinish(){
        // get请求考虑安全性应该对密码加密，这里不是项目重点，从简处理
        let res = await axios.get(`/api/login?user=${this.state.user}&pwd=${this.state.pwd}`);
        if(res.status===200 && res.data.code===0){
            this.props.changeUserState({user:res.data.user,auth:true,haveFaceData:res.data.haveFaceData});
            return this.props.history.push('/check')
        }
        return message.error(res.data.msg)
    }
    onRegister(){
        this.props.history.push("/register");
    }
    render(){
        return(
                    <LoginFrame id={'loginFrame'}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username"
                                    onChange={(v)=>this.setState({user:v.target.value})}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={v=>this.setState({pwd:v.target.value})}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    找回密码
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={()=>this.onFinish()}
                                >
                                    登录
                                </Button>
                                　
                                <a onClick={()=>this.onRegister()}>还没有账号？立即注册</a>
                            </Form.Item>
                        </Form>
                    </LoginFrame>
        );
    }
}

const LoginFrame = styled.div`
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
    .login-form{
        width:80%;
        margin:8% auto;
    }
`;

export default Login;