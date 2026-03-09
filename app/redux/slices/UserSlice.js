import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Async thunk to fetch user data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}patient-auth/getUserData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { getUserData }; // 🔹 named export
export default userSlice.reducer; // 🔹 default export reducer