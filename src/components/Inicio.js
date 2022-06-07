import React, { Component } from 'react'

import Texto from '../img/Group5.svg'

import './css/Inicio.css'

export default class Inicio extends Component {
  render() {
    return (
        <div className='main min-vh-100 MainI'>
            <nav class="navbar navbar-dark justify-content-end">
              <form class="form-inline">
                <a className='nav-item' href='/rPaciente'><button class="btn btn-outline-warning btn-danger" type="button">Regístrate</button></a>
                <a className='nav-item p-4' href='/isPaciente'><button class="btn btn-warning" type="button">Iniciar Sesión</button></a>
              </form>
            </nav>  
            <div className='min-vh-100'>
              <br></br>
              <br></br>
              <div className='mb-5 mx-5'>
                <img width="100%" src={Texto}></img>
              </div>
              <div className='d-flex justify-content-around mt-5'>
                <div className='card w-25 TarjetaI'>
                  <div className='card-body'>
                    <h5 className='card-title'>¿QUÉ ES WHEALTHY?</h5>
                    <p className='card-texts'>Es una plataforma que le ofrece consultas médicas en línea con médicos certificados desde la comodidad de su hogar.</p>
                  </div>
                </div>
                <div className='card w-25 TarjetaI'> 
                  <div className='card-body'>
                    <h5 className='card-title'>MISIÓN</h5>
                    <p className='card-texts'>Somos parte de la familia de programas de binary code y estamos enfocados en brindar un servicio médico a distancia accesible y de calidad.</p>
                  </div>
                </div>
                <div className='card w-25 TarjetaI'>
                  <div className='card-body'>
                    <h5 className='card-title'>VISIÓN</h5>
                    <p className='card-texts'>Otorgar nuestro servicio a cualquier proovedor de salud que lo requiera, mejorando la calidad de vida de la gente que lo ocupe.</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
  }
}
