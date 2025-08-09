import React, { useEffect,useState } from 'react'
import "../css/genres.css"
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from "react-redux"
import { addtoGenres,removeFromGenres, fetchAllGenres, fetchMoviesByGenre } from '../redux/slices/genreSlice';
import Movie from "../components/Movie"
import PageChanger from "../components/PageChanger"



function Genres() {
  let pageTitle = "Cinehub - Genres"

  const dispatch = useDispatch();
  const [page,setPage]=useState(1)

  const {genres,genreStatus,moviesByGenre,selectedGenres} = useSelector((store)=>store.genres)
 
  useEffect(()=>{
    dispatch(fetchAllGenres())
  },[dispatch, genreStatus])

  useEffect(()=>{
    if(selectedGenres.length>0){
      dispatch(fetchMoviesByGenre({genres:selectedGenres,page:page}))
    }
    else{
      dispatch(addtoGenres(28))
      setPage(1)
    }
  },[selectedGenres,dispatch,page])

  const handleSelectGenre=(e,id)=>{
   if(selectedGenres.length>=3){
      if(e.target.className.includes("selected")){
        e.target.className="genre"
        dispatch(removeFromGenres(id))
      }
      else{
        return
      }
   }
   else if(e.target.className.includes("selected")){
      e.target.className="genre"
      dispatch(removeFromGenres(id))
   }
   else{
      e.target.className = e.target.className+" selected"
      dispatch(addtoGenres(id))
   }
   setPage(1)
  }
  
  return ( 
  <>
    <Helmet>
        <title>{pageTitle}</title>
    </Helmet>

    <div className="genres-container"> 
      <div className="genre-title">
         {
          genres?.map((genre)=>(
            <div key={genre.id} className={selectedGenres.includes(genre.id) ? "genre selected" : "genre"} 
            onClick={(e)=>handleSelectGenre(e,genre.id)}
            >{genre.name}</div>
          ))
        }
      </div>
      <div className="genres-movies-container">
        <h1 className='genre-info-title'>Please select up to 3 Genres.</h1>
        <PageChanger page={page} setPage={setPage}/>
        <div className='genre-movies'>
          {
          moviesByGenre.map((movie)=>(
            <Movie key={movie.id} movie={movie}></Movie>
          ))
        }
        </div>
        <PageChanger page={page} setPage={setPage}/>
      </div>
    </div>
  </>
  )
}

export default Genres