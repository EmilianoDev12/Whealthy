import React, { Component, useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import NavegacionMedico from './NavegacionMedico'
import ActualizarDatosMedico from './ActualizarDatosMedico'
import FichaCitaMed from './FichaCitaMed'

import ImaUs from '../../img/img.png'

import socket from '../Socket'

import './Main.css'

const cookies = new Cookies();

function MainMed() {

    const [citas,setCitas] = useState([]);

    useEffect(() => {
        cookies.remove('IdExpediente');
        if(!cookies.get('Nombres')){
            window.location.href="./isPaciente";
        }else{
            axios.post('https://whealthy-rest.herokuapp.com/api/citas/buscarMedo',{IdMed: cookies.get('IdTipo')})
            .then(res => {
                setCitas(res.data.resp);
            });
        }
    },[]);

    return(
        <div>
            <NavegacionMedico></NavegacionMedico>
            <br></br>
            <div className='min-vh-100 my-3 mx-5'>
                <div className='d-flex'>
                    <div>
                        <img src={ImaUs} height={150} width={150}></img>
                    </div>
                    <div height="100%" className='m-3 d-flex align-items-center justify-content-center flex-column'>
                        <h1>{cookies.get('Nombres')}</h1>
                        <ActualizarDatosMedico></ActualizarDatosMedico>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className='wrapper'>
                    {citas.map((citado) => {
                        return <FichaCitaMed Cita={citado}></FichaCitaMed>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainMed;