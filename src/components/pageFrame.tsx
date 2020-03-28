import * as React from "react";
import {Spin} from "antd";
import styled from "styled-components";



export default class PageFrame extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // 数据异步请求，请求成功之后setState
        this.setState({
            loading: false
        })
    }

    render(): React.ReactElement<any>{
        return (
            <FrontWrapper>
                {this.props.children}
                {this.state.loading?
                    <Wrapper>
                        <Frame>
                            <Spin />
                            <span>加载中</span>
                        </Frame>
                    </Wrapper>
                :null}
            </FrontWrapper>

        )
    }
}
const Wrapper = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    opacity:0.5;
    background-color:grey;
`;
const Frame = styled.div`
    position:fixed;
    opacity:1;
    top:48%;
    left:48%;
    border-radius:10px;
    transform:translate(-50%,-50%);
    z-index:10001;
    background-color:white;
    padding:7px 5px 5px 5px;
    display:flex;
    flex-direction:column;
    align-item:center;
`;
export const FrontWrapper = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: #404040;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='218' height='218' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23474c4f' fill-opacity='0.32' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");
`;