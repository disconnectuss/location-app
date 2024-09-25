import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Location, LocationState } from "@/utils/types/types";
const initialState: LocationState = {
  locations: [],
};
const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Omit<Location, "id">>) => {
      const newLocation: Location = {
        ...action.payload,
        id: uuidv4(),
      };
      state.locations = [...state.locations, newLocation];
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index !== -1) {
        state.locations[index] = { ...action.payload };
      }
    },
    deleteLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload
      );
    },
  },
});
export const { addLocation, updateLocation, deleteLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
