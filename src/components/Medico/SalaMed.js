import React, { useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import socket from "../Socket";

const cookie = new Cookies();

const SalaMed = (props) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    let otrosoc = '';
    const userStream = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;
        });
        socket.emit('inicio',cookie.get('Nombres'));
    }, []);

    return (
        <div>
            <video autoPlay ref={userVideo} />
            <video autoPlay ref={partnerVideo} />
        </div>
    );
};

export default SalaMed;