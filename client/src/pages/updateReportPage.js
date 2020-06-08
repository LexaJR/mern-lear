import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'

export const updateReportPage = () => {
  const {request, loading} = useHttp()
  const [reports, setReports] = useState(null)

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
      <label htmlFor="responsibleWorker">Выбор отчета</label>
      <select 
      class="browser-default"
      id="report"
      name="report" 
      onChange={changeHandler}
      onMouseMove={searchReports}>
      <option value="" disabled selected>Choose your option</option>
      { reports.map((report) => {
          return (
          <option value={report._id}>{report.nameReport}</option>
          )
      })
      }
      </select>
    </div>
  )
}