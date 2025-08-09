import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
  import {toast } from 'react-toastify';

export const getFavoritesFromLocalStorage = ()=>{
    const favorites = localStorage.getItem("favorites")
    if(favorites){
        return JSON.parse(favorites);
    }
    return [];
}

export const IsFavorite = (id, favorites) => {
    return favorites?.some((movie) => movie.id === id);
}

const initialState = {
    movies: [],
    favoritesMovies:getFavoritesFromLocalStorage(),
    status:"idle",
    error:null,
}

export const fetchMoviesByPage=createAsyncThunk("fetchAllMovies",async(page)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`)
    return response.data.results;
})

const customToast = (movieTitle,type) =>
    toast(
        <div className="custom-toast-wrapper">
            <img className="custom-toast-icon" src="/images/Logo.png" alt="CineHub Logo" />
            <div className="custom-toast-content">
                {
                    type==="add"
                    ?
                        <h3 className="custom-toast-title"> Movie<p className="custom-toast-status added">added</p>to favorites</h3>
                    :
                    <h3 className="custom-toast-title">Movie<p className="custom-toast-status removed">removed</p>from favorites</h3>
                }
                
                <p className="custom-toast-movie-title">{movieTitle}</p>
            </div>
        </div>,
        {
            className: "custom-toast" 
        }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites:(state, action)=>{
        state.favoritesMovies.push(action.payload)
        localStorage.setItem("favorites",JSON.stringify(state.favoritesMovies))
        customToast(action.payload.title,"add")
    },
    removeFromFavorites:(state,action)=>{
        let title;
        const updatedFavList = state.favoritesMovies?.filter((fav)=>{
           if(fav.id!=action.payload){
            return fav
           }
           else{
            title = fav.title
           }
        })
        state.favoritesMovies=updatedFavList
        localStorage.setItem("favorites",JSON.stringify(updatedFavList))
        customToast(title,"remove")
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchMoviesByPage.pending,(state)=>{
        state.status="loading";
    })
    builder.addCase(fetchMoviesByPage.rejected,(state,action)=>{
        state.status="failed";
        state.error=action.error.message;
    })
    builder.addCase(fetchMoviesByPage.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.movies=action.payload;
    })
}
})

export const {addToFavorites, removeFromFavorites} = moviesSlice.actions
export default moviesSlice.reducer