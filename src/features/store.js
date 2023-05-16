import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSliceReducer from "./book/bookSlice";
import listSliceReducer from "./readingList/listSlice";

const store = configureStore({
  reducer: combineReducers({
    book: bookSliceReducer,
    list: listSliceReducer
  })
});

export default store;
