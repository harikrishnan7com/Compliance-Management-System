import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { NavBar } from './components/Navbar';
import Aos from "aos";
import 'aos/dist/aos.css';
import React, {useEffect} from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Admin } from './components/Admin';
import { User } from './components/User';
import { Auth } from './components/Auth';
import About  from './components/About';
import Contact1 from './components/Contact1';
import { Management } from './components/Management';


function App() {
  useEffect(() => {
    Aos.init({
      duration: 1250,
    })
  })
  return (
    <Auth>
      <div className="App">
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/footer" element={<footer/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Contact1" element={<Contact1/>}/>
            <Route path="/Management" element={<Management/>}/>
            
          </Routes>
      </div>
    </Auth>
  );
}

export default App;
