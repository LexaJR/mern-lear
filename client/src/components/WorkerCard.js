import React, {useState, useEffect, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'

export const WorkerCard = ({ worker }) => {
    const [placeWorks, setPlaceWorks] = useState([])
    const [posts, setPosts] = useState([])
    const {request} = useHttp()
    const [form, setForm] = useState({
        name: '', surname: '', patronymic: '', phoneNumber: '', email: '', placeWork: '', namePost: ''
    })

    const changeHandler = event => {
        // console.log(event.target.name, + " " + event.target.value)
        setForm({...form, [event.target.name]: event.target.value })
    }

    const searchPlaceWorksHandler = useCallback(async () => {
        try {
            const data = await request('/api/search/med', 'POST', null)
            setPlaceWorks(data)
        } catch (error) {console.log("Chto-to poshlo ne tak")}
    }, [request])

    const searchPostsHandler = useCallback(async () => {
        try {
            const post = await request('/api/search/posts', 'POST', null)
            setPosts(post)
        } catch (error) {console.log("Chto-to poshlo ne tak")}
    }, [request])

    const updateHandler = event => {

    }

    useEffect(() => {
        window.M.updateTextFields()
        searchPlaceWorksHandler()
        searchPostsHandler()
    }, [searchPlaceWorksHandler, searchPostsHandler])
    
  return (
    <div className="card blue darken-2">
            <div className="card-content white-text">
                        <span className="card-title">Создание сотрудника</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите имя" 
                                id="name" 
                                type="text"
                                name="name" 
                                className="yellow-input"
                                value={worker.name}
                                onChange={changeHandler}
                                />
                                <label htmlFor="name">Имя</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите фамилию" 
                                id="surname" 
                                type="text"
                                name="surname" 
                                className="yellow-input"
                                value={worker.surname}
                                onChange={changeHandler}
                                />
                                <label htmlFor="surname">Фамилия</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите отчетсво" 
                                id="patronymic" 
                                type="text"
                                name="patronymic" 
                                className="yellow-input"
                                value={worker.patronymic}
                                onChange={changeHandler}
                                />
                                <label htmlFor="patronymic">Отчество</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите номер телефона" 
                                id="phoneNumber" 
                                type="text"
                                name="phoneNumber" 
                                className="yellow-input"
                                value={worker.phoneNumber}
                                onChange={changeHandler}
                                />
                                <label htmlFor="phoneNumber">Номер телефона</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введите адресс электроной почты" 
                                id="email" 
                                type="text"
                                name="email" 
                                className="yellow-input"
                                value={worker.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Адресс электроной почты</label>
                            </div>
                            <label htmlFor="placeWork">Место работы</label>
                            <select 
                            class="browser-default"
                            id="placeWork"
                            name="placeWork" 
                            onChange={changeHandler}>
                            <option value={worker.placeWork} disabled selected>Текущее место работы</option>
                            { placeWorks.map((placeWork) => {
                                return (
                                <option value={placeWork._id}>{placeWork.namePlaceWork}</option>
                                )
                            })
                            }
                            </select>
                            <label htmlFor="namePost">Должность</label>
                            <select 
                            class="browser-default"
                            id="namePost"
                            name="namePost" 
                            onChange={changeHandler}>
                            <option value={worker.post} disabled selected>Текущая должность</option>
                            { posts.map((post) => {
                                return (
                                <option value={post._id}>{post.namePost}</option>
                                )
                            })
                            }
                            </select>
                            <div className="card-action">
                                <button 
                                className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
                                onClick={updateHandler}
                                // disabled={loading}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                </div>
            </div>
        </div>
  )
}
