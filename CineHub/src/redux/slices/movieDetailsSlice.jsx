import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const fetchMovieById= createAsyncThunk("fetchMovieById",async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`)
    return response.data
})

export const fetchMovieVideoById = createAsyncThunk("fetchMovieVideoById", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&&language=en-US`);
    
    if (response.data.results && response.data.results.length > 0) {
        const trailer = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return trailer ? trailer.key : null;
    }
    return null;
});

const initialState = {
    movie:[],
    key:null,
    status:"idle",
    error:null,
}

export const movieDetailsSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchMovieById.fulfilled,(state,action)=>{
        state.movie=action.payload;
        state.status="succeeded"
    })
      builder.addCase(fetchMovieById.rejected,(state)=>{
        state.status="failed"
        state.error=action.error.message;
    })
     builder.addCase(fetchMovieById.pending,(state)=>{
        state.status="loading"
    })

    builder.addCase(fetchMovieVideoById.fulfilled,(state,action)=>{
        state.key=action.payload
    })
    builder.addCase(fetchMovieVideoById.pending,(state)=>{
        state.key=null
    })
    builder.addCase(fetchMovieVideoById.rejected,(state)=>{
        state.key=null
    })
   
}
})

export const {} = movieDetailsSlice.actions
export default movieDetailsSlice.reducer