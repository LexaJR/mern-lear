import React, {useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'

export const SearchWorkers = () => {
  const [workers, setWorkers] = useState([])
  const [reports, setReports] = useState([])
  const [placeWorks, setPlaceWorks] = useState([])
  const {request} = useHttp()

  const [form, setForm] = useState({
    workerid: '', placeWork: ''
})

const changeHandler = event => {
  // console.log(event.target.name, + " " + event.target.value)
  setForm({...form, [event.target.name]: event.target.value })
}

const changeHandlerMed = event => {
  // console.log(event.target.name, + " " + event.target.value)
  setForm({...form, [event.target.name]: event.target.value })
  searchWorkerByMed()
}

const searchWorkerByMed = async () => {
  try {
      // console.log({...form})
      const data = await request('/api/search/workersByMed', 'POST', {...form})
      console.log({form})
      setWorkers(data)
  } catch (error) {}
}

const renderHandler = async () => {
  try {
      // console.log({...form})
      const data = await request('/api/search/reportsWorkers', 'POST', {...form})
      setReports(data)
  } catch (error) {}
}

const searchWorkers = useCallback(async () => {
  try {
      const data = await request('/api/search', 'POST', null)
      setWorkers(data)
  } catch (error) {console.log("Chto-to poshlo ne tak")}
}, [request])

const searchPlaceWorks = useCallback(async () => {
  try {
      const data = await request('/api/search/med', 'POST', null)
      setPlaceWorks(data)
  } catch (error) {console.log("Chto-to poshlo ne tak")}
}, [request])

useEffect(() => {
  searchPlaceWorks()
}, [])

  return (
    <div>
      <label htmlFor="placeWork">Выбор больницы</label>
      <select 
      class="browser-default"
      id="responsibleWorker"
      name="placeWork" 
      onChange={changeHandlerMed}>
      <option value="" disabled selected>Choose your option</option>
      { placeWorks.map((placeWork) => {
          return (
          <option value={placeWork._id}>{placeWork.namePlaceWork}</option>
          )
      })
      }
      </select>
      <label htmlFor="placeWork">Выбор сотрудника</label>
      <select 
      class="browser-default"
      id="responsibleWorker"
      name="workerid" 
      onChange={changeHandler}>
      <option value="" disabled selected>Choose your option</option>
      { workers.map((worker) => {
          return (
          <option value={worker._id}>{worker.name}    {worker.surname}    {worker.patronymic}</option>
          )
      })
      }
      </select>
      <button 
        className="btn waves-effect waves-ligh yellow darken-2 marginRight10"
        onClick={renderHandler}
        // disabled={loading}
        >
            Поиск
        </button>
      <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Наименование отчета</th>
      </tr>
      </thead>

      <tbody>
      { reports.map((report, index) => {
        return (
          <tr key={workers._id}>
            <td>{index + 1}</td>
            <td>{report.nameReport}</td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </div>
  )
}