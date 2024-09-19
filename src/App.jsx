import './App.css'
import AdminDashboardComponent from './components/admin/AdminDashboardComponent'

import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEquipeComponent from './components/admin/equipe/ListEquipeComponent'
import LoginComponent from './components/login/LoginComponent'
import EmployeeComponent from './components/Employee/EmployeeComponent'
import ManagerComponent from './components/manager/ManagerComponent'
import ProjectComponent from './components/admin/projets/ProjectComponent'
import ListEmployeeComponent from './components/admin/employee/ListEmployeeComponent'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import ChefDeProjetComponent from './components/ChefDeProjet/ChefDeProjetComponent'

function App() {
  

  return (
  
    <>
   
   <BrowserRouter>
    <Routes>
      {/* // http://localhost:3000/ */}
      <Route path='/' element={<LoginComponent />}></Route>
      {/* // http://localhost:3000/dashboard */}
      <Route path='/dashboard' element={<AdminDashboardComponent />}></Route>
      {/* // http://localhost:3000/teams */}
     <Route path='/teams' element={<ListEquipeComponent/>}></Route>
      {/* // http://localhost:3000/manager */}
      <Route path='/manager' element={<ManagerComponent />}></Route>
      {/* // http://localhost:3000/employees */}
      <Route path='/employees' element={<ListEmployeeComponent />}></Route>
     {/* // http://localhost:3000/projects */}
     <Route path='/projects' element={<ProjectComponent/>}></Route>
      {/* // http://localhost:3000/employee */}
      <Route path='/employee' element={<EmployeeComponent/>}></Route>
      {/* // http://localhost:3000/chefprojet */}
      <Route path='/chefprojet' element={<ChefDeProjetComponent />}></Route>
    </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
