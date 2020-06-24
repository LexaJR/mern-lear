import React, { useState } from "react"
import { useHttp } from "../hooks/http.hook"

export const LinksPage = () => {
  const [workers, setWorkers] = useState([])
  const [reports, setReports] = useState([])
  const { request } = useHttp()

  const [form, setForm] = useState({
    workerid: "",
    workerName: "",
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const renderHandler = async () => {
    try {
      // console.log({...form})
      const data = await request("/api/search/reportsWorkers", "POST", {
        ...form,
      })
      setReports(data)
    } catch (error) {}
  }

  const searchWorkers = async () => {
    try {
      const data = await request("/api/search", "POST", null)
      setWorkers(data)
    } catch (error) {
      console.log("Chto-to poshlo ne tak")
    }
  }

  return (
    <div>
      <label htmlFor="placeWork">Выбор сотрудника</label>
      <select
        class="browser-default"
        id="responsibleWorker"
        name="workerid"
        onChange={changeHandler}
        onMouseMove={searchWorkers}
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
      <button
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={renderHandler}
        // disabled={loading}
      >
        Создать
      </button>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Наименование отчета</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report, index) => {
            return (
              <tr key={workers._id}>
                <td>{index + 1}</td>
                <td>{report.nameReport}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
