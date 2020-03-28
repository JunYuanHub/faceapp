import React from 'react';
import { Button } from 'antd'
import styled from "styled-components";


interface Iprops {
    history:any
}
interface IState {
  state:string
}
class App extends React.Component<Iprops,IState>{
  state={
    state:"123"
  };
  handleClick(){
      this.props.history.push('/login')
  }
  render(){
    return(
        <HomePage>
            <div id={"title"}>Graduation Project</div>
            <br/>
            <div id={"subTitle"}>基于 nodejs 的 web 端人脸识别验证系统 -- 许洋溢</div>
            <Button style={{borderRadius:"5px",fontWeight:"bold"}} onClick={()=>this.handleClick()}>开始使用</Button>
        </HomePage>
    )
  }
}



const HomePage = styled.div`
    position:absolute;
    width:70%;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    display:flex;
    flex-direction:column;
    align-items:center;
    #title{
        color:white;
        font-size:4.5rem;
        font-weight:bold;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    }
    #subTitle{
        color:#E8EDF3;
        font-size:2rem;
        font-weight:bold;
        margin:o auto;
        transform: translateY(-50%);
    }
`;
export default App;
