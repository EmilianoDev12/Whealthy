import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'

import socket from "../Socket";

const cookies = new Cookies();

const FichaCita = (props) => {

    useEffect(() => {
        
    });

    const handleSubA = async (e) => {
        e.preventDefault();
        const respo = await axios.post('https://whealthy-rest.herokuapp.com/api/recetas/citasCtrl',{
            FolioCita: props.Cita.FolioCita
        });
        cookies.set('Receta',respo.data);
        window.location.href="./recetaMed";
    }

    const handleSubB = async (e) => {
        e.preventDefault();
        const idPac = await axios.post('https://whealthy-rest.herokuapp.com/api/citas/idPac',{
            FolioCita: props.Cita.FolioCita
        });
        cookies.set('IdExpediente',idPac.data.IdPaciente);
        window.location.href='./visualizarExp'
    }

    const borrar = async (e) => {
        e.preventDefault();
        const borrado = await axios.post('https://whealthy-rest.herokuapp.com/api/citas/idCit',{
            FolioCita: props.Cita.FolioCita
        });
        console.log(borrado);
        if(borrado.data.Borrado == 1){
            toast.success('Cita cancelada exitosamente');
            setTimeout(()=>{
                window.location.href="./homeMed";
            },1000);
        }
    }

    const AbrirChat = () => {
        cookies.set('Room',props.Cita.FolioCita);
        window.location.href='./chatMed';
    }

    const AbrirLlamada = () => {
        window.location.href = props.Cita.CitaUrl;
    }

    return(
        <div>
            <div className="form card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <form onSubmit={borrar}>
                            <button type="submit" className="btn btn-danger">Cancelar cita</button>
                        </form>
                        <Dropdown>
                        <Dropdown.Toggle className="btn btn-warning">
                            </Dropdown.Toggle>  
                            <Dropdown.Menu>
                                <center>
                                <form onSubmit={handleSubA}>
                                    <button className="w-100 btn btn-light" type="submit">Ver receta</button>
                                </form>
                                <form onSubmit={handleSubB}>
                                    <button className="w-100 btn btn-light" type="submit">Ver expediente del paciente</button>
                                </form>
                                </center>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <br></br>
                    <label className="form-label">Folio</label>
                    <br></br>
                    <input className="form-control" type="text" value={props.Cita.FolioCita} readOnly></input>
                    <br></br>
                    <label className="form-label">Nombre del medico</label>
                    <br></br>
                    <input className="form-control" type="text" value={''+props.Cita.NombresPacientes+' '+props.Cita.ApellidoPaternoPaciente+' '+props.Cita.ApellidoMaternoPaciente} readOnly></input>
                    <br></br>
                    <label className="form-label">Fecha cita</label>
                    <br></br>
                    <input className="form-control" type="text" value={''+props.Cita.Dia+'/'+props.Cita.Mes+'/'+props.Cita.Ano} readOnly></input>
                    <br></br>
                    <label className="form-label">Hora cita</label>
                    <br></br>
                    <input className="form-control" type="text"  value={''+props.Cita.HoraCita+':00'} readOnly></input>
                    <br></br>
                    <center>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-outline-warning" onClick={AbrirChat}>Chat</button>
                            <button className="btn btn-outline-danger" onClick={AbrirLlamada}>Video llamada</button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default FichaCita;