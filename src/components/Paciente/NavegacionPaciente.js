import React, { Component } from 'react'
import Cookies from 'universal-cookie'

import Logo from '../../img/logo.svg'

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
    cookies.remove('Citas');
    cookies.remove('Receta');
    window.location.href="./isPaciente";
  }

  render() {
    return (
      <nav className='rounded navbar navbar-light bg-light p-1 my-3 mx-5'>
          <a className='navbar-brand w-2' href='/homePac'>
            <img className='mx-2' src={Logo} width={40} height={40}></img>
            <label className='' style={{"font-size": "1.5rem"}}>Whealthy</label>
          </a>
          <div className='w-50 d-flex justify-content-end'>
            <a className='m-3' href='/agendarCita'><button className='btn btn-danger'>Registrar cita</button></a>
            <a className='m-3' href='/expPac'><button className='btn btn-danger'>Mi expediente</button></a>
            <button className='btn btn-danger m-3' onClick={()=>this.cerrarSesion()}> Cerrar Sesión</button>
          </div>
      </nav>
    )
  }
}
