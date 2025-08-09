import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    movies: [],
    status: 'idle',
    error: null,
}

export const fetchMovies = createAsyncThunk('searchMovie/fetchMovies',async (query, thunkAPI)=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}&page=1`) 
        return response.data.results
    }
    catch(err){
        if(axios.isAxiosError(err) && err.response){
             const errData={
                staus: err.response.status,
                message: err.response.data.message ||"Something went wrong."
            }
            return thunkAPI.rejectWithValue(errData);
        }
    }
});

const searchMovieSlice = createSlice({
    name: 'searchMovie',
    initialState,
    reducers: {
        clearResults(state) {
            state.movies = [];
            state.error = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch movies';
            });
    },
});

export const {clearResults} = searchMovieSlice.actions;

export default searchMovieSlice.reducer;