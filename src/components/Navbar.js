import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from './image10-removebg-preview.png'
import '../styles/nav.css'
import { useAuth } from './Auth';

export const NavBar = () => {
    const context = useAuth()
  return (
    <div className="nav-container" data-aos="fade-down" >
            <div className ="logo">
                <img className= "logoimg" alt= "logo" src={logo}/>
                <h2 className = "title">compliance manage system</h2>
            </div>
            <ul className = "navbar">
                <div className = "it">
                    <li className="list item1"><NavLink className="items" to="/">Home</NavLink></li>
                    {context.user ==='admin' &&
                    <li className="list item2"><NavLink className="items" to="/admin" >Admin</NavLink></li>}
                    <li className='list item3'><NavLink className="items" to="/Management">Management</NavLink></li>
                    <li className="list item4"><NavLink className="items" to="/user" >User</NavLink></li>
                    <li className="list item5"><NavLink className="items" to="/About" >About</NavLink></li>
                    <li className="list item6"><NavLink className="items" to="/Contact1">Contact</NavLink></li>
                </div>
                <li className="list item3"><NavLink className = "items" to="/login" >Login</NavLink></li>               
            </ul>
        </div>
  )
}
