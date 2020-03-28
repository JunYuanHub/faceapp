import React from 'react';
import styled from 'styled-components';
import {Button} from "antd";
import {connect} from "react-redux";
import FaceCollect from "./components/faceCollect";

@connect(
    state=>state,
    null
)
export default class Check extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            show:"all"
        }
    }
    render(): React.ReactElement<any> {
        if(!this.props.auth){ this.props.history.push('/')}

        const all = (
            <Wrapper>
                <div style={{margin:"1% 0 4% 37%",fontSize:"1.5rem",fontWeight:"bold"}}>请选择验证操作</div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    <Button
                        disabled={this.props.haveFaceData}
                        onClick={():void=>this.setState({show:"face-collect"})}
                    >注册人脸信息</Button>
                    <Button
                        disabled={!this.props.haveFaceData}
                        onClick={():void=>this.setState({show:"face-verify"})}
                    >人脸验证登录</Button>
                    <Button title={"当人脸验证失效时可用"}>其他验证方式</Button>
                    <Button onClick={()=>this.props.history.push('/login')}>返回</Button>
                </div>
            </Wrapper>
        );
        switch (this.state.show) {
            case "all":
                return all;
            case "face-collect":
                return (
                    <Wrapper>
                        <FaceCollect/>
                    </Wrapper>
                );
            case "face-verify":
                return <div>321</div>;
            default :
                return all
        }
    }
}

const Wrapper = styled.div`
    position:absolute;
    width:50%;
    left:50%;
    top:50%;
    padding:2%;
    transform: translate(-50%,-50%);
    background-color:white;
    border:0.1rem solid white;
    border-radius:0.4rem;
    animation:bigger2 0.3s linear 1;
    @keyframes bigger2{
        0%{width:20%;opacity:0;}
        100%{width:50%;opacity:1;}
    }
`;