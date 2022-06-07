import axios from "axios";
import React from "react";
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Doc = (props) => {

    const handleSub = async (e) =>{
        e.preventDefault();
        console.log(props);
        console.log(cookies.get('dis'));
        console.log(cookies.get('dia'));
        console.log(cookies.get('mes'));
        console.log(cookies.get('ano'));
        console.log(cookies.get('hora'));
        const fecha = cookies.get('ano')+"-"+cookies.get('mes')+"-"+cookies.get('dia')+"T"+cookies.get('hora')+":00:00";
        const zoom = await axios.post('https://whealthy-rest.herokuapp.com/agendar',{
            "date" : fecha,
            "duration" : "40",
            "topic" : "Cita médica",
            "timezone" : "America/Mexico_City"
        });
        console.log(zoom.data.response.body.join_url)
        const res = await axios.post('https://whealthy-rest.herokuapp.com/api/citas/registrar',{
            dia: cookies.get('dia'), 
            mes: cookies.get('mes'), 
            ano: cookies.get('ano'), 
            hora: cookies.get('hora'), 
            IdTip: cookies.get('IdTipo'),
            urlCita: zoom.data.response.body.join_url,
            IdMed: props.IdMedi
        });
        toast.success('Cita registrada');
        cookies.remove('dis');
        cookies.remove('dia');
        cookies.remove('mes');
        cookies.remove('ano');
        cookies.remove('hora');
        setTimeout(()=>{
            window.location.href="./homePac";
          },1000);
    }

    return(
        <div>
            <form className="card form" onSubmit={handleSub}>
                <div className="card-body">
                    <input className="form-control" type="text" value={props.NombresMedico + " " + props.ApellidoPaternoMedico + " " + props.ApellidoMaternoMedico} readOnly></input>
                    <br></br>
                    <input className="form-control" type="text" readOnly value={props.Especialidad}></input>
                    <br></br>
                    <center><button type="submit" className="btn btn-warning">Seleccionar</button></center>
                </div>
            </form>
            <Toaster
                position='top-center'
            />
        </div>
    );
}

export default Doc;