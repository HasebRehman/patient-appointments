import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    selectedHospitalCity: null,
  },
  reducers: {
    setHospitalCity: (state, action) => {
      state.selectedHospitalCity = action.payload;
    },
  },
});

export const { setHospitalCity } = hospitalSlice.actions;
export default hospitalSlice.reducer;