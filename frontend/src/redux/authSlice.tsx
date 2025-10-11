import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  id: string | null;
  name: string | null;
  username: string | null;
  picture: string | null;
  lastName: string | null;
  businessName: string | null;
  role: string | null;
  phone: string | null;
  about: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  username: null,
  picture: null,
  lastName: null,
  businessName: null,
  role: null,
  phone: null,
  about: null,
  loading: false,
  error: null,
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
export const asyncPutApi = createAsyncThunk<AuthState, Partial<AuthState>>(
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
    //get
    builder.addCase(asyncGetApi.pending, (state) => {
      state.error = null;
    });
    builder.addCase(
      asyncGetApi.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        return action.payload;
      }
    );
    builder.addCase(asyncGetApi.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch data";
    });
    //put
    builder.addCase(asyncPutApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      asyncPutApi.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        return action.payload;
      }
    );
    builder.addCase(asyncPutApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update data";
    });
  },
});

export default authSlice.reducer;
