import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { Loader } from "../components/Loader"
import { WorkerCard } from "../components/WorkerCard"

export const DetailPage = () => {
  const { request, loading } = useHttp()
  const [worker, setWorker] = useState(null)
  const workerid = useParams().id

  const getWorker = useCallback(async () => {
    try {
      const data = await request(`/api/search/${workerid}`, "GET", null)
      setWorker(data)
    } catch (e) {}
  }, [workerid, request])

  useEffect(() => {
    getWorker()
  }, [getWorker])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && worker && <WorkerCard worker={worker} />}</>
}
