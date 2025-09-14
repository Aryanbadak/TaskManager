import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

interface AuthState {
  user: null | { id: number; name: string; email: string };
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Safe parse for localStorage
let storedUser: AuthState['user'] = null;
try {
  const raw = localStorage.getItem("user");
  if (raw && raw !== "undefined" && raw !== "null") {
    storedUser = JSON.parse(raw);
  }
} catch {
  storedUser = null;
}

const initialState: AuthState = {
  user: storedUser,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    formData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      await API.post("/auth/register", formData);
      return true; 
    } catch (err: unknown) {
      let errorMessage = "Register failed";
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err: unknown) {
      let errorMessage = "Login failed";
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;