import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { ReportCard } from "../components/ReportCard"
import { Loader } from "../components/Loader"

export const UpdateReportPage = () => {
  const { request, loading } = useHttp()
  const [report, setReport] = useState(null)
  const reportid = useParams().id

  const getReport = useCallback(async () => {
    try {
      const data = await request(`/api/search/report/${reportid}`, "GET", null)
      setReport(data)
    } catch (e) {}
  }, [reportid, request])

  useEffect(() => {
    getReport()
  }, [getReport])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && report && <ReportCard report={report} />}</>
}
