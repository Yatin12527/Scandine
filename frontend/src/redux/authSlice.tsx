import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  name: string | null;
  username: string | null;
  picture: string | null;
  lastName: string | null;
  businessName: string | null;
  role: string | null;
  phone: string | null;
  about: string | null;
}

const initialState: AuthState = {
  name: null,
  username: null,
  picture: null,
  lastName: null,
  businessName: null,
  role: null,
  phone: null,
  about: null,
};

export const asyncGetApi = createAsyncThunk<AuthState, void>(
  "auth/getUserData",
  async () => {
    const response = await axios.get<AuthState>(
      `${process.env.NEXT_PUBLIC_SERVER}/users/me`,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const asyncPutApi = createAsyncThunk<AuthState, AuthState>(
  "auth/putUserData",
  async (payload) => {
    const response = await axios.put<AuthState>(
      `${process.env.NEXT_PUBLIC_SERVER}/users/addData`,
      {
        name: payload.name,
        username: payload.username,
        picture: payload.picture,
        lastName: payload.lastName,
        businessName: payload.businessName,
        role: payload.role,
        phone: payload.phone,
        about: payload.about,
      },
      { withCredentials: true }
    );
    return response.data;
    
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncGetApi.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        return action.payload;
      }
    );
    builder.addCase(
      asyncPutApi.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        return action.payload;
      }
    );
  },
});

export default authSlice.reducer;
