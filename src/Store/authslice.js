import { createSlice } from "@reduxjs/toolkit";
//import { HYDRATE } from 'next-redux-wrapper';

const isLoggedIn = () => {
  try {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    return !!localStorageData;
  } catch (error) {
    return false;
  }
};

const currentUser = () => {
  try {
    const localStorageUserData = JSON.parse(localStorage.getItem("user"));
    return localStorageUserData;
  } catch (error) {
    return "NO USER";
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: currentUser(),

    isLoggedIn: isLoggedIn(),
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));
      state.isLoggedIn = !!localStorageUserData;
    },
   
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },
});

export const { setUserDetails, setIsLoggedIn } = authSlice.actions;

// export const selectsetUserDetails= (state) => state.auth.userDetails;
// export const selectsetIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
