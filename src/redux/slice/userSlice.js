import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null, // 유저명
    uid: null, // 유저 고유번호
    isOwner: false, // 가게 점주 여부
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.isOwner = action.payload.isOwner;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;