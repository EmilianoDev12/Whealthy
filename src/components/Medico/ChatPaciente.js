import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'
import socket from '../Socket'

import NavegacionMedico from "./NavegacionMedico";

const cookies = new Cookies();

function ChatPaciente () {

    const [mensaje, setMensaje] = useState("");
    const [conectados,setConectados] = useState([]);
    const [mensajes, setMensajes] = useState([]);

    let valores = [];

    useEffect(() => {
        if(!cookies.get('Room')){
            window.location.href='./homePac';
        }else {
            socket.emit('conectar',cookies.get('Nombres'),cookies.get('Room'));
        }
    },[]);

    useEffect(() => {
        socket.on('mensajes',(mensaje) => {
            setMensajes([...mensajes,mensaje]);
        });

        return () => {socket.off()}
    },[mensajes]);

    useEffect(() => {
        socket.on('Conectados',(valor)=>{
            setConectados([...conectados,valor]);
        });

        return () => {socket.off()}
    },[conectados]);

    const subir = (e) => {
        e.preventDefault();
        socket.emit('mensaje', cookies.get('Nombres'), cookies.get('Room'), mensaje);
    }

    return(
        <div>
            <NavegacionMedico></NavegacionMedico>
            <div className="min-vh-100 d-flex">
                <div className="card my-3 mx-5 rounded h-100 w-50">
                    <form className="h-50 my-3 mx-5" onSubmit={subir}>
                        <div className="form-control" style={{height: "600px"}}>
                            {mensajes.map((e, i) => <div key={i}><span>{e.nombre}</span>: {e.mensaje}</div>)}
                        </div>
                        <br></br>
                        <div className="d-flex">
                            <input name="mensaje" className="form-control " type="text" defaultValue="" onChange={e => setMensaje(e.target.value)}></input>
                            <button className="btn btn-warning my-3 mx-5">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatPaciente;