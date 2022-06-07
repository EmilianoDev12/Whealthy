import React, { useEffect } from "react";
import Cookies from "universal-cookie";

import NavegacionPaciente from "./NavegacionPaciente";

const cookies = new Cookies();

function RecetaPac() {

    useEffect(() => {
        if(!cookies.get('Receta')){
            window.location.href = './homePac';
        }
    });

    return(
        <div>
            <NavegacionPaciente></NavegacionPaciente>
            <br></br>
            <center>
            {cookies.get('Receta') && 
            <div className='min-vh-100 my-3 mx-5 w-50'>
                <form className="card form">
                    <div className="card-body">
                        <label className="form-label">Nombres</label>
                        <input className="form-control" value={cookies.get('Receta').NombresPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Apellido paterno</label>
                        <input className="form-control" value={cookies.get('Receta').ApellidoPaternoPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Apellido paterno</label>
                        <input className="form-control" value={cookies.get('Receta').ApellidoMaternoPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Edad del paciente</label>
                        <input className="form-control" value={cookies.get('Receta').EdadPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Peso del paciente</label>
                        <input className="form-control" value={cookies.get('Receta').PesoPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Talla del paciente</label>
                        <input className="form-control" value={cookies.get('Receta').TallaPaciente} readOnly></input>
                        <br></br>
                        <label className="form-label">Observaciones y medicamento recetado: </label>
                        <textarea className="form-control" value={cookies.get('Receta').ObservacionesPaciente} readOnly></textarea>
                    </div>
                </form>
            </div>
            }
            </center>
        </div>
    );
}

export default RecetaPac;