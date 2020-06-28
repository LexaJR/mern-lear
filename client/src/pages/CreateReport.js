import React, { useState, useEffect, useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import "materialize-css"

export const CreateReport = () => {
  const [workers, setWorkers] = useState([])
  const [typesReports, setTypesReports] = useState([])
  const [reports, setReports] = useState([])
  const [baseTypes, setBaseTypes] = useState([])
  const [directions, setDirections] = useState([])
  const [caterogies, setCaterogies] = useState([])
  const [pereodicitys, setPereodicitys] = useState([])
  const [primaryInformations, setPrimaryInformation] = useState([])
  const message = useMessage()
  const { request } = useHttp()

  const [form, setForm] = useState({
    nameReport: "",
    typeReport: "",
    codePaternts: "",
    baseType: "",
    baseName: "",
    baseDate: "",
    baseNumber: "",
    baseOrganization: "",
    baseAuthor: "",
    direction: "",
    caterogies: "",
    pereodicity: "",
    formResult: "",
    deadline: "",
    responsibleWorker: "",
    primaryInformation: "",
    dataCreate: "",
    dataClose: ""
  })

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const searchWorkers = useCallback(async () => {
    try {
      const data = await request("/api/search", "POST", null)
      setWorkers(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchTypeReport = useCallback(async () => {
    try {
      const data = await request("/api/search/typeReport", "POST", null)
      setTypesReports(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchReport = useCallback(async () => {
    try {
      const data = await request("/api/search/reports", "POST", null)
      setReports(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchBaseType = useCallback(async () => {
    try {
      const data = await request("/api/search/baseType", "POST", null)
      setBaseTypes(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchDirection = useCallback(async () => {
    try {
      const data = await request("/api/search/direction", "POST", null)
      setDirections(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchCategories = useCallback(async () => {
    try {
      const data = await request("/api/search/categories", "POST", null)
      setCaterogies(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchPereodicitys = useCallback(async () => {
    try {
      const data = await request("/api/search/pereodicitys", "POST", null)
      setPereodicitys(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])
  const searchPrimaryInformations = useCallback(async () => {
    try {
      const data = await request("/api/search/primaryInformations", "POST", null)
      setPrimaryInformation(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async () => {
    try {
      const data = await request("/api/create/report", "POST", { ...form })
      message(data.message)
    } catch (error) {}
  }

  useEffect(() => {
    searchWorkers()
    searchTypeReport()
    searchReport()
    searchBaseType()
    searchDirection()
    searchCategories()
    searchPereodicitys()
    searchPrimaryInformations()
  }, [searchWorkers,
      searchTypeReport, 
      searchReport, 
      searchBaseType, 
      searchDirection,
      searchCategories,
      searchPereodicitys,
      searchPrimaryInformations])

    var elems = document.querySelectorAll('.datepicker')
    var instances = window.M.Datepicker.init(elems, {
      format: 'dd/mm/yyyy',
      showClearBtn: true,
      firstDay: 1,
      isRTL: true
    })


  return (
    <div className="card blue darken-2">
      <div className="card-content white-text">
        <span className="card-title">Создание отчета</span>
        <div>
          <div className="input-field">
            <input
              placeholder="Введите наименование отчета"
              id="nameReport"
              type="text"
              name="nameReport"
              className="yellow-input"
              value={form.nameReport}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Наименование отчета</label>
          </div>
          <label htmlFor="typeReport">Тип отчета</label>
          <select
            class="browser-default"
            id="typeReport"
            name="typeReport"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {typesReports.map((type) => {
              return (
                <option value={type._id}>
                  {type.nameTypeReport}
                </option>
              )
            })}
          </select>
          <label htmlFor="codePaternts">Код родительской записи</label>
          <select
            class="browser-default"
            id="codePaternts"
            name="codePaternts"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {reports.map((report) => {
              return (
                <option value={report._id}>
                  {report.nameReport}
                </option>
              )
            })}
          </select>
            <div class="blue darken-4">
            <label htmlFor="baseType">Тип основания</label>
          <select
            class="browser-default"
            id="baseType"
            name="baseType"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {baseTypes.map((baseType) => {
              return (
                <option value={baseType._id}>
                  {baseType.nameTypeBase}
                </option>
              )
            })}
          </select>
          <div className="input-field">
            <input
              placeholder="Введите наименование основания"
              id="baseName"
              type="text"
              name="baseName"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Наименование основания</label>
          </div>
          <label htmlFor="responsibleWorker">Дата основания</label>
          <input type="text" class="datepicker" name="baseDate" id="baseDate"></input>
          <div className="input-field">
            <input
              placeholder="Введите номер основания"
              id="baseNumber"
              type="text"
              name="baseNumber"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Номер основания</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Введите организацию основания"
              id="baseOrganization"
              type="text"
              name="baseOrganization"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Организация основание</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Введите автора основания"
              id="baseAuthor"
              type="text"
              name="baseAuthor"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Автор основания</label>
          </div>
            </div>
          <label htmlFor="direction">Направление</label>
          <select
            class="browser-default"
            id="direction"
            name="direction"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {directions.map((direction) => {
              return (
                <option value={direction._id}>
                  {direction.nameDirections}
                </option>
              )
            })}
          </select>
          <label htmlFor="caterogies">Категория</label>
          <select
            class="browser-default"
            id="caterogies"
            name="caterogies"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {caterogies.map((categori) => {
              return (
                <option value={categori._id}>
                  {categori.nameCategories}
                </option>
              )
            })}
          </select>
          <label htmlFor="pereodicity">Переодичность</label>
          <select
            class="browser-default"
            id="pereodicity"
            name="pereodicity"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {pereodicitys.map((pereodicity) => {
              return (
                <option value={pereodicity._id}>
                  {pereodicity.namePeriodicity}
                </option>
              )
            })}
          </select>
          <div className="input-field">
            <input
              placeholder="Введите форму сдачи"
              id="formResult"
              type="text"
              name="formResult"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Форма сдачи</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Введите срок исполнения"
              id="deadline"
              type="text"
              name="deadline"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="nameReport">Срок исполнения</label>
          </div>
          <label htmlFor="responsibleWorker">Ответсвтвенный сотрудник</label>
          <select
            class="browser-default"
            id="responsibleWorker"
            name="responsibleWorker"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {workers.map((worker) => {
              return (
                <option value={worker._id}>
                  {worker.name} {worker.surname} {worker.patronymic}
                </option>
              )
            })}
          </select>
          <label htmlFor="primaryInformation">Уровень сбора первичной информации</label>
          <select
            class="browser-default"
            id="primaryInformation"
            name="primaryInformation"
            onChange={changeHandler}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            {primaryInformations.map((primaryInformation) => {
              return (
                <option value={primaryInformation._id}>
                  {primaryInformation.namePrimaryInformation}
                </option>
              )
            })}
          </select>
          <label htmlFor="responsibleWorker">Дата создания</label>
          <input type="text" class="datepicker" name="dateCreate"></input>
          <label htmlFor="responsibleWorker">Дата закрытия</label>
          <input type="text" class="datepicker" name="dateClose"></input>
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
