import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'

export const CreateReport = () => {
    const [workers, setWorkers] = useState([])
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        nameReport: '', responsibleWorker: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const searchWorkers = async () => {
        try {
            const data = await request('/api/search', 'POST', null)
            setWorkers(data)
        } catch (error) {console.log("Chto-to poshlo ne tak")}
    }

    const changeHandler = event => {
        // console.log(event.target.name, + " " + event.target.value)
        setForm({...form, [event.target.name]: event.target.value })
    }

    const createHandler = async () => {
        try {
            // console.log({...form})
            const data = await request('/api/create/report', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }

    return(
        <div className="card blue darken-2">
            <div className="card-content white-text">
                    <span className="card-title">Создание отчета</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите наименование" 
                                id="nameReport" 
                                type="text"
                                name="nameReport" 
                                className="yellow-input"
                                value={form.name}
                                onChange={changeHandler}
                                onClick={searchWorkers}
                                />
                                <label htmlFor="nameReport">Наименование отчета</label>
                            </div>
                            <label htmlFor="responsibleWorker">Ответсвтвенный сотрудник</label>
                            <select 
                            class="browser-default"
                            id="responsibleWorker"
                            name="responsibleWorker" 
                            onChange={changeHandler}>
                            <option value="" disabled selected>Choose your option</option>
                            { workers.map((worker) => {
                                return (
                                <option value={worker._id}>{worker.name}    {worker.surname}    {worker.patronymic}</option>
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