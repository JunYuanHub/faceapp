import * as React from "react";
import {Button, message, Spin} from "antd";
import styled from "styled-components";




export default class FaceCollect extends React.Component<any,any>{
    // constructor(props:any) {
    //     super(props);
    // }
    componentDidMount() {
        let video = document.getElementById("video");
        let snap = document.getElementById("snap");
        window.navigator.mediaDevices.getUserMedia({
            audio:false,
            video:{
                width:560,
                height:560
            }
        }).then(function(stream) {
            // @ts-ignore
            video.srcObject = stream;
            // @ts-ignore
            video.onloadedmetadata = function(e) {
                // @ts-ignore
                video.play();
            };
        })
        .catch(function(err) {
            /* 处理error */
            console.log(err)
        });

    }
    snapShot(){
        let video = document.getElementById("video") as HTMLVideoElement;
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let snapBtn = document.getElementById("snap") as HTMLButtonElement;
        let saveBtn = document.getElementById("upload") as HTMLButtonElement;
        let flag = true;
        let ctx = canvas.getContext('2d');

        if(!ctx){ return message.error("获取canvas元素出错！请检查浏览器设备是否支持！")}
        if(flag) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            snapBtn.innerText = '取消';
            saveBtn.classList.add('show');
            flag = false;
            canvas.toBlob((blob) => {
                let url = URL.createObjectURL(blob);
                // saveBtn.href = url;
            });
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snapBtn.innerText = '截图';
            saveBtn.classList.add('hide');
            flag = true;

        }
    }

    render(): React.ReactElement<any>{
        return (
            <>
                <video id={"video"} width="216px" height="216px"/>
                <canvas id={"canvas"} width="216px" height="216px" style={{display:"none"}}/>
                <Button id="snap" onClick={()=>this.snapShot()}>截图</Button>
                <Button id="upload" onClick={()=>this.snapShot()}>上传</Button>
                <img id="img" />
            </>
        )
    }
}
