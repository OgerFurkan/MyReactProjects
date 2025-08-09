import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "../css/movie-details.css"
import { fetchMovieById, fetchMovieVideoById } from '../redux/slices/movieDetailsSlice';
import {fetchAllGenres} from "../redux/slices/genreSlice"
import { removeFromFavorites,addToFavorites,IsFavorite } from '../redux/slices/moviesSlice';
import { MdFavoriteBorder,MdFavorite,MdStar} from "react-icons/md";
import { Helmet } from 'react-helmet-async';


function MovieDetails() {
    const dispatch = useDispatch()
    const params= useParams()
    const {id:movieId} = params;

    const {movie,status,error,key} = useSelector((store)=>store.movieDetails)
    const{favoritesMovies} = useSelector((store)=>store.movies)
    const {genres:genreTitles,status:genreStatus,error:genreError} = useSelector((store)=>store.genres);
    

    const [fav,setFav]=useState("")
      useEffect(()=>{
      setFav(IsFavorite(Number(movieId),favoritesMovies))
    },[favoritesMovies])
    

    const {backdrop_path,poster_path, genres,title,relase_date,vote_average,overview} = movie

    useEffect(()=>{
        scrollToTop();
        dispatch(fetchMovieById(movieId))
        dispatch(fetchMovieVideoById(movieId))
    },[dispatch,movieId])

    useEffect(()=>{
      if(genreStatus==="idle")dispatch(fetchAllGenres())
    }, [dispatch, genreStatus])

    const getGenreById = (id) => {
      const foundGenre = genreTitles.find(genre => genre.id === id);
      return foundGenre ? foundGenre.name : "Unknown Genre";
    };
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    };

    
    const pageTitle = movie ? `CineHub - ${movie.title}` : 'CineHub - Loading...';
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <img className='movie-details-backdrop' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title} />

      {
        status==="succeeded" 
        ?
          <div className='movie-details-wrapper'>
          <div className='movie-details-poster-container'>
              <span className="movie-details-fav">
                  {
                    fav 
                    ? <MdFavorite  style={{color: "#f44531"}} className='movie-details-fav-icon' onClick={()=> dispatch(removeFromFavorites(movieId))} />
                    :<MdFavoriteBorder className='movie-details-fav-icon' onClick={()=> dispatch(addToFavorites(movie))} />
                  }
                </span>

          {poster_path || backdrop_path ? (
            <img
              className='movie-details-poster'
              src={`https://image.tmdb.org/t/p/w500/${
                poster_path ? poster_path : backdrop_path
              }`}
              alt={title}
            />
          ) : (
            <img
              style={{ width: "500px", height: "709px" }}
              className='movie-details-poster'
              src="/images/Logo.png"
              alt="No poster available"
            />
          )}
          </div>
      



          <div className="movie-details-info">
            <div className="movie-details-title">
              <p>{title}</p>
              -
              <p className='movie-details-rate'>
                <MdStar className='movie-details-rate-icon' /> {Number(vote_average).toFixed(1)}
              </p>
            </div>
            <div className="movie-details-genres" >
            {
              !genres || genres.length===0 ? <div>Genre not found</div> : 
                genres?.map((genreId) => (
                  <span key={`${genreId.id}-${movieId}`}>{getGenreById(genreId.id)}</span>
                ))
            }
            </div>
            {
              key ?
                <iframe className='movie-details-trailer'
                  src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1`}
                  style={{ border: "0" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe> :
                <div className="movie-details-no-trailer">
                  <p>Trailer Not Found</p>
                </div>
            }
            <h1 className='movie-details-desc-title'>Overview</h1>
            <p className="movie-details-desc">
              {overview}
            </p>
          </div>
          </div>
        :
          <div className='movie-details-wrapper'>
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

export default MovieDetails