import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [workers, setWorkers] = useState([])
  const {loading, request} = useHttp()

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/search', 'POST', null)
      setWorkers(fetched)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList workers={workers} />}
    </>
  )
}