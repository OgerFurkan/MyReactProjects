import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    genres:[],
    status:"idle",
    error:null,
    moviesByGenre:[],
    selectedGenres:[28],
}

export const fetchAllGenres= createAsyncThunk("fetchAllGenres",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
    return response.data.genres
})

export const fetchMoviesByGenre = createAsyncThunk("fetchMoviesByGenre",async ({ genres, page }) => {
        const genresQueryString = genres.join(',');
        console.log("page", page);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genresQueryString}&page=${Number(page)}`);
        return response.data.results;
    }
);

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addtoGenres:(state,action)=>{
        state.selectedGenres.push(action.payload)
    },
    removeFromGenres:(state,action)=>{
        state.selectedGenres = state.selectedGenres.filter((genreId) => genreId !== action.payload)
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllGenres.pending,(state)=>{
        state.status="loading";
    })
    builder.addCase(fetchAllGenres.rejected,(state,action)=>{
        state.status="failed";
        state.error=action.error.message;
    })
    builder.addCase(fetchAllGenres.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.genres=action.payload;
    })
    builder.addCase(fetchMoviesByGenre.fulfilled,(state,action)=>{
        state.moviesByGenre=action.payload;
    })
}
})

export const {addtoGenres,removeFromGenres} = genreSlice.actions
export default genreSlice.reducer