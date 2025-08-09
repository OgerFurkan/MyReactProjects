import React from 'react'
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import {addToFavorites,removeFromFavorites,IsFavorite} from '../redux/slices/moviesSlice';
import {fetchAllGenres} from "../redux/slices/genreSlice"
import "../css/movie.css"
import { MdFavoriteBorder,MdFavorite,MdStar} from "react-icons/md";


function movie({movie}) {
    const dispatch=useDispatch();

    const{favoritesMovies} = useSelector((store)=>store.movies)

    const {genre_ids,id,title,overview,poster_path,vote_average} = movie;
 
    const {genres,status:genreStatus,error:genreError} = useSelector((store)=>store.genres);

 
    
    useEffect(()=>{
        if(genreStatus=="idle") dispatch(fetchAllGenres())
    }, [dispatch, genreStatus])

    const [fav,setFav]=useState("")
    useEffect(()=>{
        setFav(IsFavorite(id,favoritesMovies))
    },[favoritesMovies])

    const getGenreById = (id) => {
        const foundGenre = genres.find(genre => genre.id === id);
        return foundGenre ? foundGenre.name : "Unknown Genre";
    };

  


  return (
    
    <div className='movie-wrapper' >
        <span className="movie-fav">
                {
                fav
                ? <MdFavorite  style={{color: "#f44531"}} className='fav-icon' onClick={()=> dispatch(removeFromFavorites(id))} /> 
                : <MdFavoriteBorder className='fav-icon' onClick={()=>dispatch(addToFavorites(movie))} />
                }
        </span>
        <Link className='movie-link' to={`/movie-details/${id}`} >
            <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
            <div className="movie-infos">
                <p className='movie-title'>
                    <span title={title} className='movie-title-ellipsis' >{title}</span> - <MdStar className='movie-rate-icon'/>
                    <span className="movie-rate">{Number(vote_average).toFixed(1)}</span>
                </p>
                <p className="movie-genres">
                    {genre_ids?.map((genreId)=>(
                    <span key={genreId}>{getGenreById(genreId)}</span>
                    ))
                    }
                </p>
                <p className="movie-desc">{overview}</p>
            </div>
        </Link>
    </div>   
  )
}

export default movie