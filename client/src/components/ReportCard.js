import React, { useState, useEffect, useCallback } from "react"
import { useMessage } from "../hooks/message.hook"
//import {useHistory} from 'react-router-dom'
import { useHttp } from "../hooks/http.hook"


export const ReportCard = ({ report }) => {
  const [workers, setWorkers] = useState([])
  const [typesReports, setTypesReports] = useState([])
  const [reports, setReports] = useState([])
  const [baseTypes, setBaseTypes] = useState([])
  const [directions, setDirections] = useState([])
  const [caterogies, setCaterogies] = useState([])
  const [pereodicitys, setPereodicitys] = useState([])
  const [primaryInformations, setPrimaryInformation] = useState([])
  const { request } = useHttp()
  const message = useMessage()
  //const history = useHistory()
  const [form, setForm] = useState({
    _id: report._id,
    nameReport: report.nameReport,
    typeReport: report.typeReport,
    codePaternts: report.codePaternts,
    baseType: report.base.type,
    baseName: report.base.name,
    baseDate: report.base.date,
    baseNumber: report.base.number,
    baseOrganization: report.base.organization,
    baseAuthor: report.base.author,
    direction: report.direction,
    caterogies: report.caterogies,
    pereodicity: report.pereodicity,
    formResult: report.formResult,
    deadline: report.deadline,
    responsibleWorker: report.responsibleWorker,
    primaryInformation: report.primaryInformation,
    dataCreate: report.dataCreate,
    dataClose: report.dataClose
  })

  const updateHandler = async () => {
    console.log(form)
    const data = await request("/api/update/report", "POST", { ...form })
    message(data.message)
    //history.push('/listworker')
  }

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

  useEffect(() => {
    window.M.updateTextFields()
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
            value={form.baseName}
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
            value={form.baseNumber}
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
            value={form.baseOrganization}
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
            value={form.baseAuthor}
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
            value={form.formResult}
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
            value={form.deadline}
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
