import React from "react"
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Cookies from "universal-cookie"
import axios from "axios"

const cookie = new Cookies();

const ActualizarDatosMedico = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [datos,setDatos] = useState({
        NombresMedico: '' + cookie.get('Nombres'),
        CorreoUsuario: '' + cookie.get('CorreoUsuario'),
        ContraseñaUsuario: '' + cookie.get('ContraseñaUsuario'),
        ApellidoPaternoMedico: '' + cookie.get('App'),
        ApellidoMaternoMedico: '' + cookie.get('Apm'),
        SexoMedico: '' + cookie.get('SexoMedico'),
        EspecialidadMedica: '' + cookie.get('EspecialidadMedica'),
        CedulaProfesional: '' + cookie.get('CedulaProfesional')
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
            if(cookie.get('CorreoUsuario') == datos.CorreoUsuario) {
                const res = await axios.post('https://whealthy-rest.herokuapp.com/api/medicos/actualizarDatos',{
                    IdUsuario: cookie.get('IdUsuario'),
                    CorreoUsuario: datos.CorreoUsuario,
                    ContraseñaUsuario: datos.ContraseñaUsuario,
                    IdTipo: cookie.get('IdTipo'),
                    NombresMedico: datos.NombresMedico,
                    App: datos.ApellidoPaternoMedico,
                    Apm: datos.ApellidoMaternoMedico,
                    SexoMedico: datos.SexoMedico,
                    EspecialidadMedica: datos.EspecialidadMedica,
                    CedulaProfesional: datos.CedulaProfesional
                });
                console.log(res.data.err);
                if(res.data.succes){
                    cookie.set('Nombres',datos.NombresMedico,{path: "/"});
                    cookie.set('App',datos.ApellidoPaternoMedico,{path: "/"});
                    cookie.set('Apm',datos.ApellidoMaternoMedico,{path: "/"});
                    cookie.set('CorreoUsuario',datos.CorreoUsuario,{path:"/"});
                    cookie.set('ContraseñaUsuario',datos.ContraseñaUsuario,{path:"/"});
                    cookie.set('SexoMedico',datos.SexoMedico,{path: "/"});
                    cookie.set('EspecialidadMedica',datos.EspecialidadMedica,{path: "/"});
                    cookie.set('CedulaProfesional',datos.CedulaProfesional,{path:"/"});
                    toast.success("Datos actualizados correctamente");
                    setTimeout(()=>{
                        window.location.href="./homeMed";
                    },500);
                }else{
                    console.log(res.data);
                }
            }else {
                const fond = await axios.post('https://whealthy-rest.herokuapp.com/api/usuarios/buscar',{
                    CorreoUsuario: datos.CorreoUsuario
                });
                if(fond.data.found){
                    toast.error('Correo ya registrado, probar con uno nuevo');
                }else{
                    const res = await axios.post('https://whealthy-rest.herokuapp.com/api/medicos/actualizarDatos',{
                        IdUsuario: cookie.get('IdUsuario'),
                        CorreoUsuario: datos.CorreoUsuario,
                        ContraseñaUsuario: datos.ContraseñaUsuario,
                        IdMedico: cookie.get('IdTipo'),
                        NombresMedico: datos.NombresMedico,
                        App: datos.ApellidoPaternoMedico,
                        Apm: datos.ApellidoMaternoMedico,
                        SexoMedico: datos.SexoMedico,
                        EspecialidadMedica: datos.EspecialidadMedica,
                        CedulaProfesional: datos.CedulaProfesional
                    });
                    if(res.data.succes){
                        cookie.set('Nombres',datos.NombresMedico,{path: "/"});
                        cookie.set('App',datos.ApellidoPaternoMedico,{path: "/"});
                        cookie.set('Apm',datos.ApellidoMaternoMedico,{path: "/"});
                        cookie.set('CorreoUsuario',datos.CorreoUsuario,{path:"/"});
                        cookie.set('ContraseñaUsuario',datos.ContraseñaUsuario,{path:"/"});
                        cookie.set('SexoMedico',datos.SexoMedico,{path: "/"});
                        cookie.set('EspecialidadMedica',datos.EspecialidadMedica.EspecialidadMedica,{path: "/"});
                        cookie.set('CedulaProfesional',datos.CedulaProfesional,{path:"/"});
                        toast.success("Datos actualizados correctamente");
                        setTimeout(()=>{
                            window.location.href="./homeMed";
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
                    <p>{props.data}</p>
                    <label className="form-label">Nombres</label>
                    <input name="NombresMedico" className="form-control" defaultValue={cookie.get('Nombres')} onChange={handleInputchange}></input>
                    <label className="form-label">Apellido paterno</label>
                    <input name="ApellidoPaternoMedico" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('App')}></input>
                    <label className="form-label" >Apellido materno</label>
                    <input name="ApellidoMaternoMedico" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('Apm')}></input>
                    <label className="form-label" >Sexo medico</label>
                    <select name="SexoMedico" onChange={handleInputchange} className="form-select" defaultValue={cookie.get('SexoMedico')}>
                        <option value="0">Masculino</option>
                        <option value="1">Femenino</option>
                    </select>
                    <label className="form-label">Especialidad medico</label>
                    <input name="EspecialidadMedica" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('EspecialidadMedica')}></input>
                    <label className="form-label">Cédula Profesional</label>
                    <input name="CedulaProfesional" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('CedulaProfesional')}></input>
                    <label className="form-label">Correo</label>
                    <input name="CorreoUsuario" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('CorreoUsuario')}></input>
                    <label className="form-label">Contraseña</label>
                    <input name="ContraseñaUsuario" onChange={handleInputchange} className="form-control" defaultValue={cookie.get('ContraseñaUsuario')}></input>
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

export default ActualizarDatosMedico;