import React, {useState, useEffect, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'

export const SearchReports = () => {

  const [workers, setWorkers] = useState([])
  const [reports, setReports] = useState([])
  const {request} = useHttp()

  const [form, setForm] = useState({
    responsibleWorker: ''
  })

  const changeHandler = event => {
    // console.log(event.target.name, + " " + event.target.value)
    setForm({...form, [event.target.name]: event.target.value })
  }

  const renderHandler = async () => {
    try {
        console.log({...form})
        const data = await request('/api/search/workersReports', 'POST', {...form})
        setWorkers(data)
    } catch (error) {}
  }

  const searchReports = useCallback(async () => {
    try {
        const data = await request('/api/search/searchReports', 'POST', null)
        setReports(data)
    } catch (error) {console.log("Chto-to poshlo ne tak")}
  }, [request])

  useEffect(() => {
    searchReports()
  }, [searchReports])

  return (
    <div>
      <label htmlFor="responsibleWorker">Выбор сотрудника</label>
      <select 
      class="browser-default"
      id="responsibleWorker"
      name="responsibleWorker" 
      onChange={changeHandler}
      onMouseMove={searchReports}>
      <option value="" disabled selected>Choose your option</option>
      { reports.map((report) => {
          return (
          <option value={report.responsibleWorker}>{report.nameReport}</option>
          )
      })
      }
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