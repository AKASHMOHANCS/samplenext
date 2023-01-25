import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./authSlice";

// const reducers = {
//   [authSlice.name]: authSlice.reducer,
// };
// const reducer = combineReducers(reducers);

// const makeStore = () =>
//   configureStore({
//     reducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(pokemonApi.middleware),
//   });

const appReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer: appReducer,
});

export default store;

//export const wrapper = createWrapper(makeStore);
