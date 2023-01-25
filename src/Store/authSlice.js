import { createSlice } from "@reduxjs/toolkit";
//import { HYDRATE } from "next-redux-wrapper";

const isLoggedInFunc = () => {
  try {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    return !!localStorageData;
  } catch (error) {
    return false;
  }
};

const currentUserFunc = () => {
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
    userDetails: currentUserFunc(),
    isLoggedIn: isLoggedInFunc(),
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      const localStorageUserData = JSON.parse(localStorage.getItem("user"));

      state.isLoggedIn = !!localStorageUserData;
    },

    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     console.log('HYDRATE', state, action.payload);
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { setUserDetails, setIsLoggedIn } = authSlice.actions;

//export const selectUserDetails = (state) => state.auth.userDetails;
//export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
