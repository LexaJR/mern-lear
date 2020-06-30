import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { Link } from "react-router-dom"
import { useMessage } from "../hooks/message.hook"

export const UpdateReport = () => {
  const { request } = useHttp()
  const [reports, setReports] = useState([])
  const [report, setReport] = useState([])
  const [directions, setDirections] = useState([])
  const [caterogies, setCaterogies] = useState([])
  const [typesReports, setTypesReports] = useState([])
  const [form, setForm] = useState({
    id: "",
    workerid: "",
    workerids: "",
    workeridunset: "",
  })
  const message = useMessage()
  const [workers, setWorkers] = useState([])
  const [workersList, setWorkersList] = useState([])

  const searchReports = useCallback(async () => {
    try {
      const data = await request("/api/search/searchReports", "POST", {
        ...form,
      })
      setReports(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request, form])

  const searchTypeReport = useCallback(async () => {
    try {
      const data = await request("/api/search/typeReport", "POST", null)
      setTypesReports(data)
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

  const RenderTable = async () => {
    try {
      const ids = await request("/api/search/workersReportsById", "POST", {
        ...form,
      })
      setReport(ids)
      const data = await request("/api/search/workersById", "POST", ids)
      setWorkers(data)
    } catch (error) {}
  }

  const searchWorkers = useCallback(async () => {
    try {
      const data = await request("/api/search", "POST", null)
      setWorkersList(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])

  const addWorker = async () => {
    try {
      const data = await request("/api/update/addWorkerReport", "POST", {
        ...form,
      })
      message(data.message)
      RenderTable()
    } catch (error) {}
  }

  const unsetWorker = async (event) => {
    try {
      const data = await request("/api/delete/unsetWorker", "POST", [
        form.id,
        form.workeridunset,
      ])
      message(data.message)
      RenderTable()
    } catch (error) {}
  }
  const unsetReport = async (event) => {
    try {
      console.log(form.id)
      const data = await request("/api/delete/report", "POST", { ...form })
      message(data.message)
      searchReports()
    } catch (error) {}
  }

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    window.M.updateTextFields()
    searchReports()
    searchWorkers()
    searchTypeReport()
    searchDirection()
    searchCategories()
  }, [searchWorkers,
      searchTypeReport,  
      searchDirection,
      searchCategories,
      searchReports
])

  return (
    <div>
      <label htmlFor="responsibleWorker">Выбор сотрудника</label>
      <select
        class="browser-default marginbottom"
        id="id"
        name="id"
        onChange={changeHandler}
      >
        <option value="" disabled selected>
          Choose your option
        </option>
        {reports.map((report) => {
          return <option value={report._id}>{report.nameReport}</option>
        })}
      </select>
      <button
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={RenderTable}
        // disabled={loading}
      >
        Таблица
      </button>
      <button
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={unsetReport}
        // disabled={loading}
      >
        Удалить отчет
      </button>
      <button
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10 "
        // disabled={loading}
      >
        <Link to={`/updatereportpage/${form.id}`}>Редактировать</Link>
      </button>
      <br></br>
      <label htmlFor="placeWork">Выбор сотрудника</label>
      <select
        class="browser-default marginbottom"
        id="WorkerList"
        name="workerid"
        onChange={changeHandler}
      >
        <option value="" disabled selected>
          Choose your option
        </option>
        {workersList.map((worker) => {
          return (
            <option value={worker._id}>
              {worker.name} {worker.surname} {worker.patronymic}
            </option>
          )
        })}
      </select>
      <button
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={addWorker}
        // disabled={loading}
      >
        Добавить
      </button>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Номер телефона</th>
            <th>Емайл</th>
            <th>Удалить</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker, index) => {
            return (
              <tr key={worker._id}>
                <td>{index + 1}</td>
                <td>{worker.name}</td>
                <td>{worker.surname}</td>
                <td>{worker.patronymic}</td>
                <td>{worker.phoneNumber}</td>
                <td>{worker.email}</td>
                <td>
                  <button
                    onClick={unsetWorker}
                    to={`#`}
                    value={worker._id}
                    onMouseOver={changeHandler}
                    name="workeridunset"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <table class="marginup">
        <span>Информация об отчете</span>
        <tr>
          <td><label>Наиименование отчета</label></td>
        <td><label>{report.nameReport}</label></td>
        </tr>
        <tr>
          <td><label>Тип отчета</label></td>
          <td><label>{typesReports.map((type) => {
            if (report.typeReport == type._id) {
              return(
                type.nameTypeReport
              )
            }
            })}</label></td>
        </tr>
        <tr>
          <td><label>Направление отчета</label></td>
          <td><label>{directions.map((direction) => {
            if (report.direction == direction._id) {
              return(
                direction.nameDirections
              )
            }
            })}</label></td>
        </tr>
        <tr>
          <td><label>Категория отчета</label></td>
          <td><label>{caterogies.map((categori) => {
            if (report.caterogies == categori._id) {
              return(
                categori.nameCategories
              )
            }
            })}</label></td>
        </tr>
      </table>
    </div>
  )
}
