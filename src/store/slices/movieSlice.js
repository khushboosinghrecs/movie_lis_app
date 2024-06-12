import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
  },

  reducers: {
    addMovies: (state, action) => {},
    removeMovie: (state, action) => {},
  },
});

export const { addMovies, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
