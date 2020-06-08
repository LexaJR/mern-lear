import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const UpdateReport = () => {
  const {request} = useHttp()
  const [reports, setReports] = useState([])
  const [form, setForm] = useState({
    id: '', workerid: ''
  })
  const message = useMessage()
  const [workers, setWorkers] = useState([])
  const [workersList, setWorkersList] = useState([])

  const searchReports = useCallback(async () => {
    try {
        const data = await request('/api/search/searchReports', 'POST', {...form})
        setReports(data)
    } catch (error) {console.log("Chto-to poshlo ne tak")}
  }, [request])



  const RenderTable = async () => {
    try {
        const ids = await request('/api/search/workersReportsById', 'POST', {...form})
        const data = await request('/api/search/workersById', 'POST', ids)
        setWorkers(data)
    } catch (error) {}
  }

  const searchWorkers = useCallback(async () => {
    try {
        const data = await request('/api/search', 'POST', null)
        setWorkersList(data)
    } catch (error) {console.log("Chto-to poshlo ne tak")}
  }, [request])

  const addWorker = async () => {
    try {
      const data = await request('/api/update/addWorkerReport', 'POST', {...form})
      message(data.message)
    } catch (error) {}
  }

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
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
      <option value="" disabled selected>Choose your option</option>
      { reports.map((report) => {
          return (
          <option value={report._id}>{report.nameReport}</option>
          )
      })
      }
      </select>
      <button 
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={RenderTable}
        // disabled={loading}
        >
            Таблица
      </button>
      <label htmlFor="placeWork">Выбор сотрудника</label>
      <select 
      class="browser-default"
      id="WorkerList"
      name="workerid" 
      onChange={changeHandler}>
      <option value="" disabled selected>Choose your option</option>
      { workersList.map((worker) => {
          return (
          <option value={worker._id}>{worker.name}    {worker.surname}    {worker.patronymic}</option>
          )
      })
      }
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
      </tr>
      </thead>

      <tbody>
      { workers.map((worker, index) => {
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
      }) }
      </tbody>
    </table>
      </div>
  )
}