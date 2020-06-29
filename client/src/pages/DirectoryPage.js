import React, { useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const DirectoryPage = () => {
  const { request } = useHttp()
  const message = useMessage()

  const [form, setForm] = useState({
    namePeriodicity: "",
    namePost: "",
    nameCategories: "",
    nameDirections: "",
    namePrimaryInformation: ""
  })

  const createPeriodicity = async () => {
    try {
      const data = await request("/api/create/periodicity", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  const createPost = async () => {
    try {
      const data = await request("/api/create/post", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  const createCategoriReport = async () => {
    try {
      const data = await request("/api/create/categoriesReport", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  const createDirections = async () => {
    try {
      const data = await request("/api/create/directions", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  const createPrimaryInformation = async () => {
    try {
      const data = await request("/api/create/primaryinformation", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }
  
  

  const changeHandler = (event) => {
    // console.log(event.target.name, + " " + event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="card blue darken-2">
      <div className="card-content white-text">
        <span className="card-title">Создание записей в справочниках</span>
        <label htmlFor="name">Переодичность</label>
        <div>
          <div className="input-field">
            <input
              placeholder="Введите наименование переодичности"
              id="namePeriodicity"
              type="text"
              name="namePeriodicity"
              className="yellow-input"
              value={form.namePeriodicity}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
            onClick={createPeriodicity}
            // disabled={loading}
          >
            Создать переодичность
          </button>
        </div>
      </div>
      <div className="card-content white-text">
        <div>
        <label htmlFor="name">Должность</label>
          <div className="input-field">
            <input
              placeholder="Введите наименование должности"
              id="namePost"
              type="text"
              name="namePost"
              className="yellow-input"
              value={form.namePost}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
            onClick={createPost}
            // disabled={loading}
          >
            Создать должность
          </button>
        </div>
      </div>
      <div className="card-content white-text">
        <div>
        <label htmlFor="name">Категория отчета</label>
          <div className="input-field">
            <input
              placeholder="Введите категорию отчета"
              id="nameCategories"
              type="text"
              name="nameCategories"
              className="yellow-input"
              value={form.nameCategories}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
            onClick={createCategoriReport}
            // disabled={loading}
          >
            Создать категорию
          </button>
        </div>
      </div>
      <div className="card-content white-text">
        <div>
        <label htmlFor="name">Направление отчета</label>
          <div className="input-field">
            <input
              placeholder="Введите направление отчета"
              id="nameDirections"
              type="text"
              name="nameDirections"
              className="yellow-input"
              value={form.nameDirections}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
            onClick={createDirections}
            // disabled={loading}
          >
            Создать направление отчета
          </button>
        </div>
      </div>
      <div className="card-content white-text">
        <div>
        <label htmlFor="name">Направление отчета</label>
          <div className="input-field">
            <input
              placeholder="Введите уровень сбора первичной информации"
              id="namePrimaryInformation"
              type="text"
              name="namePrimaryInformation"
              className="yellow-input"
              value={form.namePrimaryInformation}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
            onClick={createPrimaryInformation}
            // disabled={loading}
          >
            Создать уровень сбора первичной информации
          </button>
        </div>
      </div>
    </div>
  )
}
