import React, { Component } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import Cookie from 'universal-cookie'

import Logo from '../img/logo.svg'
import Iniciar from '../img/Iniciar.svg'

import './css/IniciarSesion.css'

const cookies = new Cookie();

export default class IniciarSesion extends Component {
  
  state = {
    CorreoUsuario: '',
    ContraseñaUsuario: ''
  }

  componentDidMount() {
    if(cookies.get('IdUsuario')){
      if(cookies.get('Tipo') == 'p'){
        window.location.href="./homePac";
      }else{
        window.location.href="./homeMed";
      }
    }
}

  onCorreo = (e) => {
    this.setState({
      CorreoUsuario: e.target.value
    });
  }
  
  onContra = (e) => {
    this.setState({
      ContraseñaUsuario: e.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.state.CorreoUsuario);
    if(this.state.CorreoUsuario == "" || this.state.ContraseñaUsuario == ""){
      toast.error("Por favor llenar todos los campos");
    }else{
      const coVal = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const contVal = /^([a-zA-Z0-9_-]){1,48}$/;
      if(!coVal.test(this.state.CorreoUsuario)){
        toast.error("Correo invalido");
      }else if(!contVal.test(this.state.ContraseñaUsuario)) {
        toast.error("Contraseña invalida");
      }else{
        const res = await axios.post('https://whealthy-rest.herokuapp.com/api/usuarios/iniciarSesion', {
          CorreoUsuario: this.state.CorreoUsuario,
          ContraseñaUsuario: this.state.ContraseñaUsuario
        })
        if(res.data.found != 1){
          if(res.data.TipoUsuario == 'p'){
            cookies.set('IdUsuario',res.data.IdUsuario,{path: "/"});
            cookies.set('IdTipo',res.data.IdPaciente,{path: "/"});
            cookies.set('Tipo',res.data.TipoUsuario);
            cookies.set('Nombres',res.data.NombresPacientes,{path: "/"});
            cookies.set('App',res.data.ApellidoPaternoPaciente,{path: "/"});
            cookies.set('Apm',res.data.ApellidoMaternoPaciente,{path: "/"});
            cookies.set('CorreoUsuario',res.data.CorreoUsuario,{path:"/"});
            cookies.set('ContraseñaUsuario',res.data.ContraseñaUsuario,{path:"/"});
          }else {
            cookies.set('IdUsuario',res.data.IdUsuario,{path: "/"});
            cookies.set('IdTipo',res.data.IdMedico,{path: "/"});
            cookies.set('Tipo',res.data.TipoUsuario);
            cookies.set('Nombres',res.data.NombresMedico,{path: "/"});
            cookies.set('App',res.data.ApellidoPaternoMedico,{path: "/"});
            cookies.set('Apm',res.data.ApellidoMaternoMedico,{path: "/"});
            cookies.set('CorreoUsuario',res.data.CorreoUsuario,{path:"/"});
            cookies.set('ContraseñaUsuario',res.data.ContraseñaUsuario,{path:"/"});
            cookies.set('SexoMedico',res.data.SexoMedico,{path: "/"});
            cookies.set('EspecialidadMedica',res.data.EspecialidadMedica,{path: "/"});
            cookies.set('CedulaProfesional',res.data.CedulaProfesional,{path:"/"});
          }
          toast.success("Sesión iniciada");
          console.log(cookies.get('Nombres'));
          if(res.data.TipoUsuario == 'p'){
            setTimeout(()=>{
              window.location.href="./homePac";
            },1000);
          }else {
            setTimeout(()=>{
              window.location.href="./homeMed";
            },1000);
          }
        }else{
          toast.error("Usuario no encontrado");
        }
      }
    }
  }

  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center min-vh-100 PrincipalIS'>
          <div className='d-flex'>
            <img className='mx-4' width="25%" src={Logo}></img>
            <img width="55%" src={Iniciar}></img>
          </div>
          <br></br>
          <div className='card w-50'>
              <form className='card-body form-group' onSubmit={this.onSubmit}>
                <br></br>
                <input className='form-control' placeholder='Correo' onChange={this.onCorreo}/>
                <br></br>
                <br></br>
                <input type="password" className='form-control' placeholder='Contraseña' onChange={this.onContra}/>
                <br></br>
                <br></br>
                <center>
                <div>
                    <span className=''>¿NO TIENES CUENTA? </span>
                    <a href='/rPaciente'> REGÍSTRATE AQUÍ</a>
                </div>
                </center>
                <br></br>
                <center><button type='submit' className='btn btn-warning'>Iniciar Sesión</button></center>
              </form>
          </div>
          <Toaster
            position='top-center'
          />
      </div>
    )
  }
}
