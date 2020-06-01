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
                <ul id="dropdown1" class="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
                    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/createreport">Создать отчет</NavLink></li>
                    <li><NavLink to="/links">Поиск по сотруднику</NavLink></li>
                    <li><NavLink to="/searchreports">Поиск по отчету</NavLink></li>
                    <li><a href="#" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
          
        </nav>
    )
}