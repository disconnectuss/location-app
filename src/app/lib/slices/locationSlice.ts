import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export interface Location {
  id: string;
  title: string;
  lat: number;
  lng: number;
  color: string;
}

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [], 
};

const { reducer, actions } = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      const newLoc = { ...action.payload, id: v4() };

      state.locations.push(newLoc);

      toast.success("New Location added successfully");
    },

    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex((i) => i.id === action.payload.id);

      state.locations.splice(index, 1, action.payload);

      toast.success("Location Updated!");
    },
  },
});

export const { addLocation, updateLocation } = actions;

export default reducer;
