import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userData : {}
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers:{
    addUser: (state, action) => {
      state.userData = action.payload
    },
    removeUser: (state) => {
      state.userData = {}
    }
  }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer