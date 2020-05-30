import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'

export const CreatePage = () => {
    const [meds, setMeds] = useState([])
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        name: '', surname: '', patronymic: '', phoneNumber: '', email: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const createHandler = async () => {
        try {
            console.log({...form})
            const data = await request('/api/create/worker', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }
    const searchMedHandler = async () => {
        try {
            const data = await request('/api/search/med', 'POST', null)
            console.log(data)
            setMeds(data)
        } catch (error) {console.log("Chto-to poshlo ne tak")}
    }


    return(
        <div className="card blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Создание пользователя</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите email" 
                                id="name" 
                                type="text"
                                name="name" 
                                className="yellow-input"
                                value={form.name}
                                onChange={changeHandler}
                                onClick={searchMedHandler}
                                />
                                <label htmlFor="name">Имя</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите пароль" 
                                id="surname" 
                                type="text"
                                name="surname" 
                                className="yellow-input"
                                value={form.surname}
                                onChange={changeHandler}
                                />
                                <label htmlFor="surname">Фамилия</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите пароль" 
                                id="patronymic" 
                                type="text"
                                name="patronymic" 
                                className="yellow-input"
                                value={form.patronymic}
                                onChange={changeHandler}
                                />
                                <label htmlFor="patronymic">Отчество</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите пароль" 
                                id="phoneNumber" 
                                type="text"
                                name="phoneNumber" 
                                className="yellow-input"
                                value={form.phoneNumber}
                                onChange={changeHandler}
                                />
                                <label htmlFor="phoneNumber">Номер телефона</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите пароль" 
                                id="email" 
                                type="text"
                                name="email" 
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Адресс электроной почты</label>
                            </div>
                            <select 
                            class="browser-default"
                            id="placeWork"
                            name="placeWork" 
                            onChange={changeHandler}>
                            { meds.map((med) => {
                                return (
                                <option value={med._id}>{med.namePlaceWork}</option>
                                )
                            })
                            }
                            </select>
                            <div className="card-action">
                                <button 
                                className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
                                onClick={createHandler}
                                // disabled={loading}
                                >
                                    Создать
                                </button>
                            </div>
                    </div>
                    </div>
                    </div>
    )

}