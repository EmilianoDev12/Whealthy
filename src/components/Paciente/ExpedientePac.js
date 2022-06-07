import React from "react"
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Cookies from "universal-cookie"
import axios from "axios"
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import NavegacionPaciente from './NavegacionPaciente'

const cookies = new Cookies();

function ExpedientePac(){

    const [fich,setFich] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const handleInputchange = (e) => {
        setFich({
            ...fich,
            [e.target.name] : e.target.value
        });
    }

    useEffect( () => {
        cookies.remove('Receta');
        if(!cookies.get('Nombres')){
            window.location.href="./isPaciente";
        }else{
            axios.post('https://whealthy-rest.herokuapp.com/api/pacientes/buscarFich',{
                    IdTipo: cookies.get('IdTipo')
            }).then(res => {
                console.log(res.data);
                setFich(res.data[0]);
                if(res.data[0].DiaNacimientoPaciente != 0 && res.data[0].AnoNacimientoPaciente != 0 && res.data[0].MesNacimientoPaciente != 0){
                    const fecha = ''+(res.data[0].MesNacimientoPaciente + 1)+'/'+res.data[0].DiaNacimientoPaciente+'/'+res.data[0].AnoNacimientoPaciente;
                    console.log(fecha);
                    setStartDate(new Date(fecha));
                }
            }).catch(err => {
                console.log(err)
            });
        }
        
    }, []);

    const handleSub = async (e) => {
        e.preventDefault();
        console.log(fich.TelefonoPaciente);
        const dias = startDate.toString().substring(7,10);
        const mess = startDate.getMonth();
        const anos = startDate.getFullYear();
        const res = await axios.post('https://whealthy-rest.herokuapp.com/api/pacientes/actualizarFich',{
            Ano: anos,
            Mes: mess, 
            Dia: dias, 
            Nacio: fich.IdNacionalidad, 
            Reli: fich.IdReligion, 
            Late: fich.LaterallidadPacciente, 
            Sex: fich.SexoPaciente, 
            Tel: fich.TelefonoPaciente, 
            Ocu: fich.OcupacionPaciente, 
            IdTipo: cookies.get('IdTipo')
        });
        console.log(res);
        toast.success('Ficha de identificación actualizada con éxito');
    }

    return(
        <div>
            <NavegacionPaciente></NavegacionPaciente>
            <div className="my-3 mx-5">
                <h1>Expediente Médico</h1>
                <div className="d-flex justify-content-center">
                    <div className="card w-75">
                        <div className="card-body">
                            <h3 className="card-title">Ficha de identificación</h3>
                            <form onSubmit={handleSub}>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <label className="form-label">Nombre/s</label>
                                        <input type="text" className="form-control" value={fich.NombresPacientes} readOnly></input>
                                    </div>
                                    <div>
                                        <label className="form-label">Apellido paterno</label>
                                        <input type="text" className="form-control" value={fich.ApellidoPaternoPaciente} readOnly></input>
                                    </div>
                                    <div>
                                        <label className="form-label">Apellido materno</label>
                                        <input type="text" className="form-control" value={fich.ApellidoMaternoPaciente} readOnly></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <label className="form-label">Sexo</label>
                                        
                                        <select name="SexoPaciente" className="form-select" onChange={handleInputchange}>
                                            <option value="0" disabled>Selecciona tu sexo</option>
                                            {fich.SexoPaciente == 1 ? <option selected value="1">Masculino</option> : <option value="1">Masculino</option>}
                                            {fich.SexoPaciente == 2 ? <option selected value="2">Femenino</option> : <option value="2">Femenino</option>}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label">Fecha de nacimiento</label>
                                        <DatePicker
                                            className='form-control'
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="MMMM d, yyyy"
                                            maxDate={new Date()}
                                            minDate={new Date("1/1/1980")}
                                        ></DatePicker>
                                    </div>
                                </div>
                                <br></br>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <label className="form-label">Ocupación</label>
                                        <input name="OcupacionPaciente" type="text" className="form-control" defaultValue={fich.OcupacionPaciente} onChange={handleInputchange}></input>
                                    </div>
                                    <div>
                                        <label className="form-label">Lateralidad</label>
                                        <select name="LaterallidadPacciente" className="form-select" onChange={handleInputchange}>
                                            <option  value="0" disabled>Selecciona tu Lateralidad</option>
                                            {fich.LaterallidadPacciente == 1 ? <option selected value="1">Diestro</option> : <option value="1">Diestro</option>}
                                            {fich.LaterallidadPacciente == 2 ? <option selected value="2">Zurdo</option> : <option value="2">Zurdo</option>}
                                            {fich.LaterallidadPacciente == 3 ? <option selected value="3">Ambidiestro</option> : <option value="3">Ambidiestro</option>}
                                        </select>
                                    </div>
                                </div>
                                <br></br>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <label className="form-label">Religion</label>
                                        <select name="IdReligion" className="form-select" onChange={handleInputchange}>
                                            <option value="0" disabled>Seleccione su religón</option>
                                            {fich.IdReligion == 1 ? <option selected value="1">Cristiano</option> : <option value="1">Cristiano</option>}
                                            {fich.IdReligion == 2 ? <option selected value="2">Católico</option> : <option value="2">Católico</option>}
                                            {fich.IdReligion == 3 ? <option selected value="3">Agnóstico</option> : <option value="3">Agnóstico</option>}
                                            {fich.IdReligion == 4 ? <option selected value="1">Ateo</option> : <option value="4">Ateo</option>}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label">Nacionalidad</label>
                                        <select name="IdNacionalidad" className="form-select" onChange={handleInputchange}>
                                            {fich.IdNacionalidad == "MX" ? <option selected value="MX">Mexicano</option> : <option value="MX">Mexicano</option>}
                                            {fich.IdNacionalidad == "US" ? <option selected value="US">Estadounidense</option> : <option value="US">Estadounidense</option>}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label">Teléfono celular</label>
                                        <input name="TelefonoPaciente" type="text" className="form-control" defaultValue={fich.TelefonoPaciente} onChange={handleInputchange}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="d-flex justify-content-around">
                                    <button type="submit" className="btn btn-warning">Actualizar ficha</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position='top-center'
            />
        </div>
    );
}

export default ExpedientePac;