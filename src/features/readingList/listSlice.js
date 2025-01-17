import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../apiService";

const initialState = {
  favorites: [],
  books: []
};

export const addToReadingList = createAsyncThunk("/favorites", async (book) => {
  console.log("action", book);
  const response = await apiService.post(`/favorites`, book);
  console.log("a", response.data);
  return response.data;
});

export const removeBook = createAsyncThunk(
  "favorites/removeBook",
  async (removedBookId) => {
    const response = await apiService.delete(`/favorites/${removedBookId}`);
    console.log("b", response.data);
    return response.data;
  }
);

export const getFavoriteBooks = createAsyncThunk("/favorites", async () => {
  const response = await apiService.get("/favorites");
  console.log("fav books", response.data);
  return response.data;
});

export const getBooks = createAsyncThunk("/books", async (url) => {
  const response = await apiService.get(url);
  console.log("all books", response.data);
  return response.data;
});

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getFavoriteBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoriteBooks.fulfilled, (state, action) => {
        console.log("getFavoriteBooks.fulfilled", action);
        state.favorites = action.payload;
      })
      .addCase(getFavoriteBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(removeBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const removedBookId = action.payload;
        console.log("test", state);
        state.favorites = state.favorites.filter(
          (book) => book.id !== removedBookId
        );
        state.favorites = [...state.favorites];
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// export const { addToReadingList } = listSlice.actions;
export default listSlice.reducer;
