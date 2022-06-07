import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Toaster, toast } from 'react-hot-toast'

import NavegacionMedico from "./NavegacionMedico";

const cookies = new Cookies();

function RecetaPac() {

    const [datos,setDatos] = useState({
        EdadPaciente: cookies.get('Receta').EdadPaciente,
        PesoPaciente: cookies.get('Receta').PesoPaciente,
        TallaPaciente: cookies.get('Receta').TallaPaciente,
        ObservacionesPaciente: cookies.get('Receta').ObservacionesPaciente
    });

    const handleInputchange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
        console.log(e.target.value);
    }

    const handleSub = async (e) => {
        e.preventDefault();
        const numeros = /[0-9]/;
        console.log(datos.EdadPaciente);
        if(!numeros.test(datos.EdadPaciente)){
            toast.error('Edad invalida');
        }else if(!numeros.test(datos.PesoPaciente)){
            toast.error('Peso invalido');
        }else if(!numeros.test(datos.TallaPaciente)){
            toast.error('Talla invalida del paciente');
        }else{
            const res = await axios.post('https://whealthy-rest.herokuapp.com/api/recetas/actualizarCtrl',{
                EdadPaciente: datos.EdadPaciente,
                ObservacionesPaciente: datos.ObservacionesPaciente,
                PesoPaciente: datos.PesoPaciente,
                TallaPaciente: datos.TallaPaciente,
                IdCita: cookies.get('Receta').IdCita
            });
            console.log(res);  
            toast.success('Receta actualizada con éxito');
        }
    }

    useEffect(() => {
        cookies.remove('IdExpediente');
        if(!cookies.get('Receta')){
            window.location.href = './homePac';
        }
    });

    return(
        <div>
            <NavegacionMedico></NavegacionMedico>
            <br></br>
            <center>
            {cookies.get('Receta') && 
            <div className='min-vh-100 my-3 mx-5 w-50'>
                <form className="card form" onSubmit={handleSub}>
                    <div className="card-body">
                        <label className="form-label">Nombres</label>
                        <input className="form-control" defaultValue={cookies.get('Receta').NombresPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Apellido paterno</label>
                        <input className="form-control" defaultValue={cookies.get('Receta').ApellidoPaternoPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Apellido paterno</label>
                        <input className="form-control" defaultValue={cookies.get('Receta').ApellidoMaternoPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Edad del paciente</label>
                        <input name="EdadPaciente" className="form-control" defaultValue={cookies.get('Receta').EdadPaciente} onChange={handleInputchange}></input>
                        <br></br>
                        <label className="form-label">Peso del paciente en kilos</label>
                        <input name="PesoPaciente" className="form-control" defaultValue={cookies.get('Receta').PesoPaciente} onChange={handleInputchange}></input>
                        <br></br>
                        <label className="form-label">Talla del paciente en centimetros</label>
                        <input name="TallaPaciente" className="form-control" defaultValue={cookies.get('Receta').TallaPaciente} onChange={handleInputchange}></input>
                        <br></br>
                        <label className="form-label">Observaciones y medicamento recetado: </label>
                        <textarea name="ObservacionesPaciente" className="form-control" defaultValue={cookies.get('Receta').ObservacionesPaciente} onChange={handleInputchange}></textarea>
                        <br></br>
                        <button className="btn btn-warning" type="submit">Actualizar Receta</button>
                    </div>
                </form>
            </div>
            }
            </center>
            <Toaster
                position='top-center'
            />
        </div>
    );
}

export default RecetaPac;