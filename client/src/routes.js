import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {SearchWorkers} from './pages/SearchWorkers'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {CreateReport} from './pages/CreateReport'
import {DefaultPage} from './pages/DefaultPage'
import {SearchReports} from './pages/SearchReports'
import {ListWorkerPage} from './pages/ListWorkerPage'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/searchworker" exact>
          <SearchWorkers />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/createreport" exact>
          <CreateReport />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/searchreports">
        <SearchReports />
        </Route>
        <Route path="/listworker">
        <ListWorkerPage />
        </Route>
        <Route path="/default">
          <DefaultPage />
        </Route>
        
        <Redirect to="/default" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}