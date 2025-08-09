import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home.jsx"
import Genres from '../pages/Genres.jsx'
import Favorites from '../pages/Favorites.jsx'
import MovieDetails from '../pages/MovieDetails.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

function RouterConfig() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/genres' element={<Genres/>}></Route>
        <Route path='/favorites' element={<Favorites/>}></Route>
        <Route path='/movie-details/:id' element={<MovieDetails/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
  )
}

export default RouterConfig