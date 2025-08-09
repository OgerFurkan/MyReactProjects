import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Movie from '../components/Movie'
import { IoSearch } from "react-icons/io5";
import "../css/favorites.css"
import {MdFavorite} from "react-icons/md";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

function Favorites() {


  const {favoritesMovies} = useSelector((store)=>store.movies)
  const [index,setIndex]=useState(0)
  const [query,setQuery]=useState("")
  const [searchedMovie,setSearchedMovie] = useState([])

  const searchMovieList= ()=>{
    if(!query) {
    return favoritesMovies;
    } 
    const lowercaseQuery = query.toLowerCase().trim();
    return favoritesMovies.filter((mov)=>{
      const title = mov.title;
        if(title !== null && title !== undefined){
          return title.toLocaleLowerCase().includes(lowercaseQuery)
        }
         return false
      })
  }

  useEffect(()=>{
    setSearchedMovie(searchMovieList())
  },[query,favoritesMovies])

  useEffect(()=>{
    if(index>=favoritesMovies.length){
      setIndex(favoritesMovies.length>0 ? favoritesMovies.length-1 : 0)

    }
  },[favoritesMovies,index])

  const handlePickMovie = () => {
    if (favoritesMovies.length <= 1) {
      return; 
    }
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * favoritesMovies.length);
    } while (newIndex === index);

    setIndex(newIndex);
  };

  return (
    <div className='favorite-movies-container'>
      <h1 className='favorite-title'>Your Favorites <MdFavorite className='favorite-heart'/> </h1>
      <div className="favorite-movie-picker-wrapper">
        <img className='favorite-movie-picker-backdrop' src={`https://image.tmdb.org/t/p/original/${
          favoritesMovies[index] ? favoritesMovies[index].backdrop_path : null        }`} alt={favoritesMovies[index] ? favoritesMovies[index].title : ""} />
        {
        favoritesMovies.length > 0 && favoritesMovies[index] ?
        <Movie key={favoritesMovies[index].id} movie={favoritesMovies[index]} /> : <>
         <img className='favorite-movie-not-found-img' src={"/images/Logo.png"} alt={""}/>
        <div className='no-favorite-movie-info'>You Do Not Have Any Favorite Movie!</div></>
        }
        {
          favoritesMovies.length ===0 ? <Link to={"/"} className='favorite-link-home'>Add Some Movie!</Link> : <input className='favorite-movie-picker-button' type="button" value="  Pick A Movie  " onClick={handlePickMovie}/>
        }
       
      </div>

        <div className="favorite-search-bar" >

            <input type="text" className="search-input-favorite" id='search-input-favorite' placeholder='Search A Movie Name' value={query} onChange={(e)=>setQuery(e.target.value)}/>

            <label htmlFor="search-input-favorite">
            {
              query.length<1
              ?
                <IoSearch className='favorite-search-icon'/>
              :
                <RxCross1 className='favorite-search-icon' onClick={()=>setQuery("")}/>
              }
            </label>
        </div>

      <div className='favorite-movie-wrapper'>
        {
         searchedMovie.length<=0 ? <div className='no-favorite-movie-info'>Favorite Movie Not Found!</div> : searchedMovie.map((movie)=>(
            <Movie key={movie.id} movie={movie}/>
          )) 
        }
      </div>
    </div>
  )
}

export default Favorites