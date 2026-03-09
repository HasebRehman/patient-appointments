import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import hospitalReducer from "./slices/hospitalSlice";
import doctorReducer from "./slices/doctorSlice";
import patientReducer from "./slices/patientSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    hospital: hospitalReducer,
    doctor: doctorReducer,
    patient: patientReducer,
  },
});