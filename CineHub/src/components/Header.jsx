import React, {useCallback, useEffect, useState } from 'react'
import "../css/header.css"
import { Link,useLocation } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import {MdStar} from "react-icons/md";
import{useDispatch, useSelector} from "react-redux"
import {clearResults, fetchMovies} from '../redux/slices/searchMovieSlice';
import { RxCross1 } from "react-icons/rx";
import { Helmet } from 'react-helmet-async';

function Header() {
  const dispatch = useDispatch()
  const location = useLocation();
  const [searchValue,setSearchValue]=useState("")

  const {favoritesMovies} = useSelector((store)=> store.movies)
  const {movies} = useSelector((store)=> store.searchMovie)

  const shakeAnimation = {
    animationName: "heartbeat",
    animationDuration: "0.1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear"
  }

    const [isAdded,setIsAdded]=useState(false)
  
  useEffect(()=>{
    setIsAdded(true)
    setTimeout(()=>{
      setIsAdded(false)
    },500)
  },[favoritesMovies.length])

  useEffect(()=>{
    if (searchValue.length > 0) {
      dispatch(fetchMovies(searchValue));
    } else {
      dispatch(clearResults());
    }
     
  },[searchValue, dispatch])
  
  const handleSearchInputChange = useCallback((e)=>{
    setSearchValue(e.target.value)
  },[])
  const handleClearResult = ()=>{
    setSearchValue("")
    dispatch(clearResults())
  }

  let pageTitle = 'CineHub';  
  if (location.pathname === '/') {
    pageTitle = 'CineHub - Home';
  } else if (location.pathname === '/movies') {
    pageTitle = 'CineHub - Movies';
  } else if (location.pathname === '/favorites') {
    pageTitle = 'CineHub - Favorites';
  }

  return (
    <header>    
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
        <Link to={"/"}> <img src="/images/cinehub_178-60.png"  alt="logo" id="logo"/></Link>
        <div className="nav-search">
          <input type="text" value={searchValue} id="search-input" placeholder='Search' onChange={handleSearchInputChange} />
          <label htmlFor="search-input">
             {
              searchValue.length<1
              ?
              <CiSearch className='nav-search-icon'/>
              :
              <RxCross1 className='nav-search-icon' onClick={()=>setSearchValue("")}/>
            }
          </label>
        </div>
        {
            movies.length>0 ?
             <div className="nav-results">
            {
              movies?.map((movie)=>(
                <Link key={movie.id} to={`/movie-details/${movie.id}`}>
                  <div className="nav-result-movie-wrapper" onClick={handleClearResult}>
                      {
                        <>
                          {
                            movie.poster_path ? <img className='nav-result-movie-poster' src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt={movie.title} />:
                            <img className='nav-result-movie-poster-not-found' src={"/images/Logo.png"} alt={movie.title}/>  
                          }
                          <div className="nav-result-movie-info">
                            <div className="nav-result-movie-header">
                              <p className='nav-result-movie-title'>
                                {
                                  movie.title
                                }
                              </p>
                              -
                              <p className="nav-result-movie-rate">
                                <MdStar className='nav-result-movie-rate-icon'/>{Number(movie.vote_average).toFixed(1)}
                              </p>
                            </div>
                        <p className="nav-result-movie-overview">
                            {
                              movie.overview
                            }
                        </p>
                          </div>
                          
                        </>
                      }
                    </div>
                  </Link>
              ))
            }
          </div>:
            ""
        }
          
        <ul className="nav">
            <li><Link to={"/"}
             className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >Home</Link></li>
            <li><Link to={"/genres"}
            className={`nav-link ${location.pathname === '/genres' ? 'active' : ''}`}
            >Genres</Link></li>
            <li><Link to={"/favorites"}
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            ><FaHeart style={isAdded ? shakeAnimation : undefined} /><span className='count-favs'>{favoritesMovies.length}</span></Link></li>
        </ul>
    </header>
  )
}

export default Header