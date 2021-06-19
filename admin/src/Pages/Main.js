import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AdminIndex from './AdminIndex'
import ArticleList from './ArticleList'
import Login from './Login'

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={AdminIndex} />
    </Router>
  )
}

export default Main