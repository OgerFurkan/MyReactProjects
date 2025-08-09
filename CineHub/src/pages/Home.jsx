import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesByPage} from '../redux/slices/moviesSlice';
import Movie from '../components/Movie';
import "../css/home.css"
import PageChanger from "../components/PageChanger"

function Home() {
    const dispatch=useDispatch();
    const {movies,status} = useSelector((store)=>store.movies);
    const [page,setPage]=useState(1)

    useEffect(()=>{
      dispatch(fetchMoviesByPage(page))
    },[page,dispatch])

  return (
  <>

    <div className='home-main-title'>
      <div className="home-left-title">
        <img className='logo' src="/images/Logo.png" alt="" />
        <div className='header-title'>
        <h1 className='header-1'>THE MOST</h1>
        <h1 className='header-2'>POPULAR</h1>
        <h1 className='header-3'>MOVIES</h1>
      </div>
      </div>
      <img className='logo-name' src="/images/logo-name.png" alt="" />
    </div>

    {
      status==="succeeded"
      ? 
      <>
        <PageChanger page={page} setPage={setPage}/>
        <div className='movie-container'>
          {
            movies?.map((movie)=>(
              <Movie key={movie.id} movie={movie}/>
            ))
          }
        </div>
        <PageChanger page={page} setPage={setPage}/>
      </>
      : 
        <div className='movie-container'>
          <div className="loader-wrapper">
            <div className="loader-logo">
              <img className='logo-name' src="/images/Logo.png" alt="" />
            </div>
            <div className="loader-ring"></div>
          </div>
        </div>
    }
       
  </>
    
  )
}
export default Home