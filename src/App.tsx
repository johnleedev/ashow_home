import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AshowMain from './AshowMain';
import Login from './login/Login'
import LoginKakao from './login/LoginKakao';
import LoginNaver from './login/LoginNaver';
import Logister from './login/Logister';
import Admin from './Admin/Admin';
import AdminMain from './Admin/AdminMain';
import Alert from './Admin/Alert';
import AdminBuildings from './Admin/AdminBuildings';
import AdminPyenginfo from './Admin/AdminPyenginfo';
import AdminGetBuildingsInfo from './Admin/AdminGetBuildingsInfo';
import AdminGetPyengInfo from './Admin/AdminGetPyengInfo';

function App() {
  
  return (
    <div className="App">
    
    <Routes>
        <Route path="/" element={<AshowMain></AshowMain>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/loginnaver" element={<LoginNaver/>}/>
        <Route path="/loginkakao" element={<LoginKakao/>}/>
        <Route path="/logister" element={<Logister/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/adminmain" element={<AdminMain/>}/>
        <Route path="/adminalert" element={<Alert/>}/>
        <Route path="/adminbuildings" element={<AdminBuildings/>}/>
        <Route path="/adminpyenginfo" element={<AdminPyenginfo/>}/>
        <Route path="/admingetbuildingsinfo" element={<AdminGetBuildingsInfo/>}/>
        <Route path="/admingetpyenginfo" element={<AdminGetPyengInfo/>}/>
      </Routes>

    </div>
  );
}

export default App;
