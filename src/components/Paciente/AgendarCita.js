import React, { Component, useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import DatePicker from 'react-datepicker'
import { Toaster, toast } from 'react-hot-toast'

import NavegacionPaciente from './NavegacionPaciente'
import ActualizarDatosPaciente from './ActualizarDatosPaciente'

import ImaUs from '../../img/img.png'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

const cookies = new Cookies();

function AgendarCita() {

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        cookies.remove('Receta');
        if(!cookies.get('Nombres')){
            window.location.href="./isPaciente";
        }
    });

    const handleSub = async (e) => {
        e.preventDefault();
        const dias = startDate.toString().substring(7,10);
        const mess = startDate.getMonth();
        const anos = startDate.getFullYear();
        const horas = startDate.getHours();
        console.log(cookies.get('IdTipo'))
        const res = await axios.post('https://whealthy-rest.herokuapp.com/api/citas/buscarDocs',{
            dia: dias,
            mes: mess,
            ano: anos,
            hora: horas,
            IdTip: cookies.get('IdTipo')
        });
        console.log(res);
        if(res.data.registrado == '1'){
            toast.error('Ya tienes una cita ese día');
        }else{
            let disponibles = [];
            
            for(let i=0;i<res.data.Doctores.length;i += 1){
                if(res.data.Lista.length == 0){
                    disponibles.push(res.data.Doctores[i]);
                }else {
                    let match = true;
                    for(let j=0;j<res.data.Lista.length; j += 1){
                        if(res.data.Lista[j].IdMedico == res.data.Doctores[j].IdMedico){
                            match = false;
                        }
                    }
                    if(match){
                        disponibles.push(res.data.Doctores[i]);
                    }
                }
            }
            console.log(disponibles);
            if(disponibles.length != 0){
                cookies.set('dis',disponibles);
                cookies.set('dia',dias);
                cookies.set('mes',mess);
                cookies.set('ano',anos);
                cookies.set('hora',horas);
                window.location.href="./selec";
            }else{
                toast.error('Seleccionar fecha distinta, no hay meds disponibles');
            }
        }
    }

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    return(
        <div>
            <NavegacionPaciente></NavegacionPaciente>
            <br></br>
            <div className='min-vh-100 my-3 mx-5'>
                <center>
                <form className='card form w-50' onSubmit={handleSub}>
                    <center>
                    <div className='card-body'>
                        <h1>Registrar cita</h1>
                        <br></br>
                        <label className='form-label'>Fecha y hora</label>
                        <DatePicker
                            className='form-control'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={new Date()}
                            filterDate={isWeekday}
                            filterTime={filterPassedTime}
                            inline
                        />
                        <br></br>
                        <br></br>
                        <div className='d-flex justify-content-around'>
                            <a className='btn btn-warning' href='./homePac'>Cancelar</a>
                            <button type='submit' className='btn btn-warning'>Buscar</button>
                        </div>
                    </div>
                    </center>
                </form>
                </center>
                <Toaster
                    position='top-center'
                />
            </div>
        </div>
    );
}

export default AgendarCita;