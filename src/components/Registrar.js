import axios from 'axios';
import React, { Component } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import Doc from '../img/doctor4.svg'
import DocD from '../img/doctor3.svg'
import Texto from '../img/Group6.svg'

import './css/Registrar.css'

export default class Registrar extends Component {

  state = {
    CorreoUsuario: "",
    ContraseñaUsuario: "",
    NombresPaciente: "",
    App: "",
    Apm: "",
    Acep: ""
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

  onNom = (e) => {
    this.setState({
      NombresPaciente: e.target.value
    });
  }

  onApm = (e) => {
    this.setState({
      Apm: e.target.value
    });
  }

  onApp = (e) => {
    this.setState({
      App: e.target.value
    });
  }

  onAc = (e) => {
    this.setState({
      Acep: e.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const coVal = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const contVal = /^([a-zA-Z]){1,16}$/;
    const nombres = /^[a-zA-Z ]{2,254}/;
    const aps = /^[a-zA-Z]{2,64}/;
    console.log(this.state.Acep);
    if(this.state.NombresPaciente == "" || this.state.CorreoUsuario == "" || this.state.ContraseñaUsuario == "" || this.state.App == "" || this.state.Apm == ""){
      toast.error("Por favor llenar todos los campos");
    }else if(!coVal.test(this.state.CorreoUsuario)){
      toast.error("Correo inválido");
    }else if(!contVal.test(this.state.ContraseñaUsuario)){
      toast.error("Contraseña inválida");
    }else if(!nombres.test(this.state.NombresPaciente)){
      toast.error("Nombres inválidos");
    }else if(!aps.test(this.state.App)){
      toast.error("Apellido paterno inválido");
    }else if(!aps.test(this.state.Apm)){
      toast.error("Apellido materno inválido");
    }else if(this.state.Acep != "on"){
      toast.error("Aceptar términos y condiciones");
    }else {
      const res = await axios.post('https://whealthy-rest.herokuapp.com/api/usuarios/registrarUsuario', {
        CorreoUsuario: this.state.CorreoUsuario,
        ContraseñaUsuario: this.state.ContraseñaUsuario,
        NombresPaciente: this.state.NombresPaciente,
        App: this.state.App,
        Apm: this.state.Apm
      });
      if(res.data.registrado == "1"){
        toast.error("Correo ya registrado");
      }else {
        toast.success("Usuario registrado correctamente");
        setTimeout(()=>{
          window.location.href="./isPaciente";
        },1500);
      }
    }
  }

  render() {
    return (
      <div className='d-flex min-vh-100'>
          <div className='w-50 min-vh-100'>
            <div className='h-50 Toso'>
              <br></br>
              <br></br>
              <center>
                <img width="75%" src={Texto}></img>
              </center>
            </div>
            <br></br>
            <div className='d-flex justify-content-center'>
              <div>
                <img src={Doc}></img>
              </div>
              <div>
                <img src={DocD}></img>
              </div>
            </div>
          </div>
          <div className='card w-50 min-vh-100' style={{background: "linear-gradient(180deg, rgba(231,23,23,1) 0%, rgba(188,8,8,1) 35%, rgba(172,23,59,1) 100%)", height: "100%"}}>
            <form className='form-group min-vh-100 d-flex flex-column p-4 justify-content-around' onSubmit={this.onSubmit}>
                <input className='border border-dark rounded from-control InputR' placeholder='Correo' onChange={this.onCorreo}/>
                <input type="password" className='border border-dark rounded from-control InputR' placeholder='Contraseña' onChange={this.onContra}/>
                <label className='LabeloR'>Datos personales</label>
                <input className='border border-dark rounded from-control InputR' placeholder='Nombre(s)' onChange={this.onNom}/>
                <input className='border border-dark rounded from-control InputR' placeholder='Apellido Paterno' onChange={this.onApp}/>
                <input className='border border-dark rounded from-control InputR' placeholder='Apellido Materno' onChange={this.onApm}/>
                <div className='d-flex justify-content-around'>
                  <a className='HiperR' href='/'>Aviso de Privacidad</a>
                  <a className='HiperR' href='/'>Politícas con Términos de Uso</a>
                </div>
                <span><input className='form-check-input' type="checkbox" onChange={this.onAc}/><span className='LabeloR'>He leído y acepto las políticas y aviso de privacidad</span></span>
                <button type='submit' className='btn btn-warning'>Iniciar Sesión</button>
            </form>
          </div>
          <Toaster
            position='top-center'
          />
      </div>
    )
  }
}
