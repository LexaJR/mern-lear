import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { LinksList } from "../components/LinksList"
import { Loader } from "../components/Loader"

export const ListWorkerPage = () => {
  const [workers, setWorkers] = useState([])
  const { request, loading } = useHttp()

  const renderHandler = useCallback(async () => {
    try {
      const data = await request("/api/search", "POST", null)
      setWorkers(data)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    renderHandler()
  }, [renderHandler])

  if (loading) {
    return <Loader />
  }

  return <div>{!loading && <LinksList workers={workers} />}</div>
}
