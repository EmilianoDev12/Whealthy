import React, { Component } from 'react'
import Cookies from 'universal-cookie'

import logo from '../../img/logo.png'

const cookies = new Cookies();

export default class NavegacionPaciente extends Component {
  
  cerrarSesion = () =>{
    cookies.remove('IdUsuario');
    cookies.remove('IdTipo');
    cookies.remove('Tipo');
    cookies.remove('Nombres');
    cookies.remove('App');
    cookies.remove('Apm');
    cookies.remove('CorreoUsuario');
    cookies.remove('ContraseñaUsuario');
    cookies.remove('SexoMedico');
    cookies.remove('EspecialidadMedico');
    cookies.remove('CedulaProfesional');
    window.location.href="./isPaciente";
  }

  render() {
    return (
      <nav className='rounded navbar navbar-light bg-light p-3 my-3 mx-5'>
          <a className='navbar-brand w-2' href='/homeMed'>
            <img src={logo} width={40} height={40}></img>
            <label className='m-2' style={{"font-size": "1.5rem"}}>Whealthy</label>
          </a>
          <div className='w-50 d-flex justify-content-end'>
            <button className='btn btn-danger m-3' onClick={()=>this.cerrarSesion()}> Cerrar Sesión</button>
          </div>
      </nav>
    )
  }
}
