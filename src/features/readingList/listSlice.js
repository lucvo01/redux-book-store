import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../apiService";

const initialState = {
  favorites: [
    {
      author: "",
      country: "",
      imageLink: "",
      language: "",
      link: "",
      pages: null,
      title: "",
      year: null,
      id: ""
    }
  ],
  books: [
    {
      author: "",
      country: "",
      imageLink: "",
      language: "",
      link: "",
      pages: null,
      title: "",
      year: null,
      id: ""
    }
  ]
};

export const addToReadingList = createAsyncThunk(
  "/favorites",
  async (state, action) => {
    const response = await apiService.post("/favorites", action.payload);
    console.log("a", response.data);
    // state.favorites.map((item) => {
    //   if (item.id !== action.payload.id) return response.data;
    // });
    return response.data;
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // addToReadingList: (action, state) => {
    //   const newBook = action.payload;
    //   console.log(state);
    //   //   state.favorites.push(newBook);
    // },
    // extraReducers: {}
  }
});

// export const { addToReadingList } = listSlice.actions;
export default listSlice.reducer;
