import React from "react"
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Cookies from "universal-cookie"
import axios from "axios"

const cookie = new Cookies();

function ActualizarDatos() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [datos,setDatos] = useState({
        NombresPaciente: '' + cookie.get('Nombres'),
        CorreoUsuario: '' + cookie.get('CorreoUsuario'),
        ContraseñaUsuario: '' + cookie.get('ContraseñaUsuario'),
        ApellidoPaternoPaciente: '' + cookie.get('App'),
        ApellidoMaternoPaciente: '' + cookie.get('Apm'),
    });

    const handleInputchange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    const handleSub = async (e) => {
        e.preventDefault();
        const coVal = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const contVal = /^([a-zA-Z0-9_-]){1,48}$/;
        if(!coVal.test(datos.CorreoUsuario)){
            toast.error('El correo es invalido');
        }else if(!contVal.test(datos.ContraseñaUsuario)){
            toast.error('La contraseña es invalida');
        }else{
            if(cookie.get('CorreoUsuario') == datos.CorreoUsuario){
                const res =  await axios.post('https://whealthy-rest.herokuapp.com/api/pacientes/actualizarDatos',{
                    IdUsuario: cookie.get('IdUsuario'),
                    CorreoUsuario: datos.CorreoUsuario,
                    ContraseñaUsuario: datos.ContraseñaUsuario,
                    IdTipo: cookie.get('IdTipo'),
                    NombresPaciente: datos.NombresPaciente,
                    App: datos.ApellidoPaternoPaciente,
                    Apm: datos.ApellidoMaternoPaciente,
                });
                if(res.data.succes){
                    cookie.set('Nombres',datos.NombresPaciente,{path: "/"});
                    cookie.set('App',datos.ApellidoPaternoPaciente,{path: "/"});
                    cookie.set('Apm',datos.ApellidoMaternoPaciente,{path: "/"});
                    cookie.set('CorreoUsuario',datos.CorreoUsuario,{path:"/"});
                    cookie.set('ContraseñaUsuario',datos.ContraseñaUsuario,{path:"/"});
                    toast.success("Datos actualizados correctamente");
                    setTimeout(()=>{
                        window.location.href="./homePac";
                    },500);
                }else{
                    console.log(res.data);
                }
            }else{
                const fond = await axios.post('https://whealthy-rest.herokuapp.com/api/usuarios/buscar',{
                    CorreoUsuario: datos.CorreoUsuario
                });
                if(fond.data.found){
                    toast.error('Correo ya registrado');
                }else{
                    const res =  await axios.post('https://whealthy-rest.herokuapp.com/api/pacientes/actualizarDatos',{
                        IdUsuario: cookie.get('IdUsuario'),
                        CorreoUsuario: datos.CorreoUsuario,
                        ContraseñaUsuario: datos.ContraseñaUsuario,
                        IdTipo: cookie.get('IdTipo'),
                        NombresPaciente: datos.NombresPaciente,
                        App: datos.ApellidoPaternoPaciente,
                        Apm: datos.ApellidoMaternoPaciente,
                    });
                    if(res.data.succes){
                        cookie.set('Nombres',datos.NombresPaciente,{path: "/"});
                        cookie.set('App',datos.ApellidoMaternoPaciente,{path: "/"});
                        cookie.set('Apm',datos.ApellidoMaternoPaciente,{path: "/"});
                        cookie.set('CorreoUsuario',datos.CorreoUsuario,{path:"/"});
                        cookie.set('ContraseñaUsuario',datos.ContraseñaUsuario,{path:"/"});
                        toast.success("Datos actualizados correctamente");
                        setTimeout(()=>{
                            window.location.href="./homePac";
                        },500);
                    }else{
                        console.log(res.data);
                    }
                }
            }
        }
    }

    return (
        <>
        <Button className="btn btn-warning" variant="primary" onClick={handleShow}>
            Actualizar Datos
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar datos</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSub}>
                <Modal.Body>
                    <label className="form-label">Nombres</label>
                    <input name="NombresPaciente" className="form-control" defaultValue={cookie.get('Nombres')} onChange={handleInputchange}></input>
                    <label className="form-label">Apellido paterno</label>
                    <input name="ApellidoPaternoPaciente" className="form-control" defaultValue={cookie.get('App')} onChange={handleInputchange}></input>
                    <label className="form-label" >Apellido materno</label>
                    <input name="ApellidoMaternoPaciente" className="form-control" defaultValue={cookie.get('Apm')} onChange={handleInputchange}></input>
                    <label className="form-label">Correo</label>
                    <input name="CorreoUsuario" className="form-control" defaultValue={cookie.get('CorreoUsuario')} onChange={handleInputchange}></input>
                    <label className="form-label">Contraseña</label>
                    <input name="ContraseñaUsuario" className="form-control" defaultValue={cookie.get('ContraseñaUsuario')} onChange={handleInputchange}></input>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <button type="submit" className="btn btn-warning" onClick={handleClose}>
                    Save Changes
                </button>
                </Modal.Footer>
            </form>
        </Modal>
        <Toaster
        position='top-center'
        ></Toaster>
        </>
    );
}

export default ActualizarDatos;