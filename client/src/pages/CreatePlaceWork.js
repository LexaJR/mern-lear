import React, { useState, useEffect, useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import "materialize-css"

export const CreatePlaceWork = () => {
  const message = useMessage()
  const { request } = useHttp()

  const [form, setForm] = useState({
    namePlaceWork: "",
  })

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const changeHandler = (event) => {
    // console.log(event.target.name, + " " + event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async () => {
    try {
      // console.log({...form})
      const data = await request("/api/create/placeWork", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }

  return (
    <div className="card blue darken-2">
      <div className="card-content white-text">
        <span className="card-title">Создание отчета</span>
        <div>
          <div className="input-field">
            <input
              placeholder="Введите наименование места работы"
              id="namePlaceWork"
              type="text"
              name="namePlaceWork"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Наименование места работы</label>
          </div>
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
