import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    selectedDoctorId: null,
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.selectedDoctorId = action.payload;
    },
    clearDoctorId: (state) => {
      state.selectedDoctorId = null;
    },
  },
});

export const { setDoctorId, clearDoctorId } = doctorSlice.actions;
export default doctorSlice.reducer;