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
    document.addEventListener('DOMContentLoaded', function() {
        var options
        var elems = document.querySelectorAll('.dropdown-trigger')
        var instances = window.M.Dropdown.init(elems, options)})
    return(
        <nav>
            <div className="nav-wrapper blue darken-1 padding2rem">
            <NavLink to="/default" className="brand-logo">РМИАЦ</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Создать</a>
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><NavLink to="/create">Создать сотрудника</NavLink></li>
                        <li><NavLink to="/createreport">Создать отчет</NavLink></li>
                    </ul>
                    <li><NavLink to="/searchworker">Поиск по сотруднику</NavLink></li>
                    <li><NavLink to="/searchreports">Поиск по отчету</NavLink></li>
                    <li><NavLink to="/listworker">Список сотрудников</NavLink></li>
                    <li><NavLink to="/updateReport">Редактирование отчета</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}