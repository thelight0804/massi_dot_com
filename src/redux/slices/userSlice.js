import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null, // Firestore 문서 고유번호
    uid: null, // 유저 고유번호
    address: null, // 주소
    profileImage: null, // 프로필 이미지 URL
    isOwner: false, // 가게 점주 여부
    phoneNumber: null, // 전화번호
    name: null, // 유저명
    email: null, // 이메일
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.uid = action.payload.uid;
      state.address = action.payload.address;
      state.profileImage = action.payload.profileImage;
      state.isOwner = action.payload.isOwner;
      state.phoneNumber = action.payload.phoneNumber;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;