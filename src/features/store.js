import { configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "./book/bookSlice";
import listSliceReducer from "./readingList/listSlice";

const store = configureStore({
  reducer: {
    book: bookSliceReducer,
    list: listSliceReducer
  }
});

export default store;
