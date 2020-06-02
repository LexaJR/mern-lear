import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import 'materialize-css'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return(
        <nav>
            <div className="nav-wrapper blue darken-1 padding2rem">
            <NavLink to="/default" className="brand-logo">РМИАЦ</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать сотрудника</NavLink></li>
                    <li><NavLink to="/createreport">Создать отчет</NavLink></li>
                    <li><NavLink to="/searchworker">Поиск по сотруднику</NavLink></li>
                    <li><NavLink to="/searchreports">Поиск по отчету</NavLink></li>
                    <li><NavLink to="/listworker">Список сотрудников</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
          
        </nav>
    )
}