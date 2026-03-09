// redux/slices/patientSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPatientId: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientId: (state, action) => {
      state.selectedPatientId = action.payload;
    },
    clearPatientId: (state) => {
      state.selectedPatientId = null;
    },
  },
});

export const { setPatientId, clearPatientId } = patientSlice.actions;
export default patientSlice.reducer;