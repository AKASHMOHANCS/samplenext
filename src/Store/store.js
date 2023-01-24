import { combineReducers, configureStore } from '@reduxjs/toolkit';



import authslice from './authslice';

const appReducer = combineReducers({
    auth:authslice
});

const store = configureStore({
    reducer: appReducer
})

export default store

// const makeStore = configureStore({
//     reducer: {
//       [authslice.name]: authslice.reducer,
//     },
//   });
//   export const wrapper = createWrapper(makeStore);
  