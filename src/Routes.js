import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Dashboard from './screens/dashboard/Dashboard'

export default function Routes () {
  return (
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/dashboard' component={Dashboard} />
    </Switch>
  )
}
