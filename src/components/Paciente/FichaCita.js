import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'
import { Dropdown } from "react-bootstrap";
import { v1 as uuid } from "uuid";

const cookies = new Cookies();

const FichaCita = (props) => {

    const [date,setDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
            console.log(date.getSeconds())
        },
        1000);
    },[]);

    const handleSub = async (e) => {
        e.preventDefault();
        const respo = await axios.post('https://whealthy-rest.herokuapp.com/api/recetas/citasCtrl',{
            FolioCita: props.Cita.FolioCita
        });
        cookies.set('Receta',respo.data);
        window.location.href="./recetaPac";
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
                window.location.href="./homePac";
            },1000);
        }
    }

    const Formulario = () => {
        return(<form onSubmit={handleSub}>
            <button className="w-100 btn btn-light" type="submit">Ver receta</button>
        </form>);
    }

    const AbrirChat = () => {
        cookies.set('Room',props.Cita.FolioCita);
        window.location.href='./chatPac';
    }

    const StartCall = () => {
        console.log(props.Cita.CitaUrl);
        window.location.href = props.Cita.CitaUrl;
    }

    const actua = () =>{
    }

    return(
        <div>
            <div className="form card m-4">
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
                                        <Formulario className="w-100"></Formulario>
                                    </center>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    <br></br>
                    <label className="form-label">Folio</label>
                    <br></br>
                    <input className="form-control" type="text" value={props.Cita.FolioCita} readOnly></input>
                    <br></br>
                    <label className="form-label">Nombre del médico</label>
                    <br></br>
                    <input className="form-control" type="text" value={''+props.Cita.NombresMedico+' '+props.Cita.ApellidoPaternoMedico+' '+props.Cita.ApellidoMaternoMedico} readOnly></input>
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
                            <button className="btn btn-outline-danger" onClick={StartCall}>Video llamada</button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default FichaCita;