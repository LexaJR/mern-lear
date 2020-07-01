import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"

export const SearchReports = () => {
  const { request } = useHttp()
  const [reports, setReports] = useState([])
  const [form, setForm] = useState({
    id: "",
    workerid: "",
    workerids: "",
    workeridunset: "",
  })
  const [workers, setWorkers] = useState([])
  const [workersList, setWorkersList] = useState([])

  const searchReports = useCallback(async () => {
    try {
      const data = await request("/api/search/searchReports", "POST", null)
      setReports(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }, [request])

  const RenderTable = async () => {
    try {
      const ids = await request("/api/search/workersReportsById", "POST", {
        ...form,
      })
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

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    searchReports()
    searchWorkers()
  }, [searchReports, searchWorkers])

  return (
    <div>
      <label htmlFor="responsibleWorker">Выбор сотрудника</label>
      <select
        class="browser-default"
        id="id"
        name="id"
        onChange={changeHandler}
      >
        <option value="" disabled selected>
          Выберите вариант из выпадающего списка
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
        Поиск
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
// <td><Link to={`/api/delete/unsetWorker/${form.id}&${worker._id}`}>Удалить</Link></td>   onClick={unsetWorker(worker._id)}  setForm({...form, workerid: worker._id })
