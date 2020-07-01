import React, { useState, useEffect, useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import "materialize-css"

export const CreatePage = () => {
  const [placeWorks, setPlaceWorks] = useState([])
  const [posts, setPosts] = useState([])
  const message = useMessage()
  const { request } = useHttp()

  const [form, setForm] = useState({
    name: "",
    surname: "",
    patronymic: "",
    phoneNumber: "",
    email: "",
    placeWork: "",
    namePost: "",
  })

  const changeHandler = (event) => {
    // console.log(event.target.name, + " " + event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async () => {
    try {
      // console.log({...form})
      const data = await request("/api/create/worker", "POST", { ...form })
      // const data = await request('/api/create/post', 'POST', {...form})
      message(data.message)
    } catch (error) {
      message(error.message)
    }
  }
  const searchPlaceWorksHandler = useCallback(async () => {
    try {
      const data = await request("/api/search/med", "POST", null)
      setPlaceWorks(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchPostsHandler = useCallback(async () => {
    try {
      const post = await request("/api/search/posts", "POST", null)
      setPosts(post)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])

  useEffect(() => {
    window.M.updateTextFields()
    searchPlaceWorksHandler()
    searchPostsHandler()
  }, [searchPlaceWorksHandler, searchPostsHandler])
  
  return (
    <div className="card blue darken-2">
      <div className="card-content white-text">
        <span className="card-title">Создание пользователя</span>
        <div>
          <div className="input-field">
            <input
              placeholder="Введите имя"
              id="name"
              type="text"
              name="name"
              className="yellow-input"
              value={form.name}
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
              value={form.surname}
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
              value={form.patronymic}
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
              value={form.phoneNumber}
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
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Адресс электроной почты</label>
          </div>
          <label htmlFor="placeWork">Место работы</label>
          <select
            class="browser-default"
            id="placeWork"
            name="placeWork"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Выберите вариант из выпадающего списка
            </option>
            {placeWorks.map((placeWork) => {
              return (
                <option value={placeWork._id}>{placeWork.namePlaceWork}</option>
              )
            })}
          </select>
          <label htmlFor="namePost">Должность</label>
          <select
            class="browser-default"
            id="namePost"
            name="namePost"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Выберите вариант из выпадающего списка
            </option>
            {posts.map((post) => {
              return <option value={post._id}>{post.namePost}</option>
            })}
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
