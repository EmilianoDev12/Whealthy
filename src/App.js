import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Inicio from './components/Inicio';
import Registrar from './components/Registrar';
import IniciarSesion from './components/IniciarSesion';
import MainPac from './components/Paciente/MainPac';
import MainMed from './components/Medico/MainMed';
import ExpedientePac from './components/Paciente/ExpedientePac';
import AgendarCita from './components/Paciente/AgendarCita';
import SeleccionarMed from './components/Paciente/SeleccionarMed';
import RecetaPac from './components/Paciente/Receta'
import RecetaMed from './components/Medico/Receta'
import VisualizarExpediente from './components/Medico/VisualizarExpediente'
import Socket from './components/Socket'
import ChatPaciente from './components/Paciente/ChatPaciente';
import ChatMedico from './components/Medico/ChatMedico';

function App() {

  Socket.emit('conectado', 'Hola desde cliente');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}></Route>
        <Route path='/rPaciente' element={<Registrar></Registrar>}></Route>
        <Route path='/isPaciente' element={<IniciarSesion></IniciarSesion>}></Route>
        <Route path='/homePac' element={<MainPac></MainPac>}></Route>
        <Route path='/homeMed' element={<MainMed></MainMed>}></Route>
        <Route path='/expPac' element={<ExpedientePac></ExpedientePac>}></Route>
        <Route path='/agendarCita' element={<AgendarCita></AgendarCita>}></Route>
        <Route path='/selec' element={<SeleccionarMed></SeleccionarMed>}></Route>
        <Route path="/recetaPac" element={<RecetaPac></RecetaPac>}></Route>
        <Route path='/recetaMed' element={<RecetaMed></RecetaMed>}></Route>
        <Route path='/visualizarExp' element={<VisualizarExpediente></VisualizarExpediente>}></Route>
        <Route path='/chatPac' element={<ChatPaciente></ChatPaciente>}></Route>
        <Route path='/chatMed' element={<ChatMedico></ChatMedico>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
