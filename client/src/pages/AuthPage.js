import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const pressHandler = async event => {
        if (event.key === 'Enter') {
          try {
            loginHandler()
          } catch (e) {}
        }
      }

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (error) {}
    }
    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>РМИАЦ</h1>
                <div className="card blue">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите email" 
                                id="email" 
                                type="text"
                                name="email" 
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password"
                                name="password" 
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}
                                onKeyPress={pressHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
                        onClick={loginHandler}
                        disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                        className="btn waves-effect waves-ligh yellow darken-4"
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}