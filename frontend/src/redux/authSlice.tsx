import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  id: string | null;
  name: string | null;
  username: string | null;
  picture: string | null;
  iat: number | null;
  exp: number | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  username: null,
  picture: null,
  iat: null,
  exp: null,
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
  },
});

export default authSlice.reducer;
