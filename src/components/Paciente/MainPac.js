import React, { Component, useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import NavegacionPaciente from './NavegacionPaciente'
import ActualizarDatosPaciente from './ActualizarDatosPaciente'
import FichaCita from './FichaCita'

import socket from '../Socket'

import ImaUs from '../../img/img.png'

import './Main.css'

var cookies = new Cookies();

function MainPac() {

    const [citas,setCitas] = useState([]);

    useEffect(() => {
        cookies.remove('Receta');
        if(!cookies.get('Nombres')){
            window.location.href="./isPaciente";
        }else{
            axios.post('https://whealthy-rest.herokuapp.com/api/citas/buscarPac', {IdPac: cookies.get('IdTipo')})
            .then(res => {
                setCitas(res.data.resp);
            });
        }
    },[]);

    return(
        <div>
            <NavegacionPaciente></NavegacionPaciente>
            <br></br>
            <div className='min-vh-100 my-3 mx-5'>
                <div className='d-flex'>
                    <div>
                        <img src={ImaUs} height={150} width={150}></img>
                    </div>
                    <div height="100%" className='m-3 d-flex align-items-center justify-content-center flex-column'>
                        <h1>{cookies.get('Nombres')}</h1>
                        <ActualizarDatosPaciente></ActualizarDatosPaciente>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className='wrapper'>
                    {citas.map((citado) => {
                        return <FichaCita Cita={citado}></FichaCita>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainPac;