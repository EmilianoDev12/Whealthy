import React, { Component, useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import DatePicker from 'react-datepicker'
import { Toaster, toast } from 'react-hot-toast'

import NavegacionPaciente from './NavegacionPaciente'
import ActualizarDatosPaciente from './ActualizarDatosPaciente'
import Doc from './Doctores'

import ImaUs from '../../img/img.png'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

import './Selec.css'

const cookies = new Cookies();

function SeleccionarMed() {

    useEffect(() => {
        if(!cookies.get('dis')){
            window.location.href="./homePac";
        }
        console.log(cookies.get('dis'));
    });


    return(
        <div>
            <NavegacionPaciente></NavegacionPaciente>
            <br></br>
            <div className='min-vh-100 my-3 mx-5 wrapper'>
                {cookies.get('dis').map((doc) => {
                    return <Doc IdMedi={doc.IdMedico} NombresMedico={doc.NombresMedico} ApellidoPaternoMedico={doc.ApellidoPaternoMedico} ApellidoMaternoMedico={doc.ApellidoMaternoMedico} Especialidad={doc.EspecialidadMedica}></Doc>;
                })}
            </div>
        </div>
    );

}

export default SeleccionarMed;