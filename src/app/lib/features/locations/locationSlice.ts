// src/store.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Location {
  id: string;
  name: string;
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

const {reducer,actions} = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<{ id: string; updatedLocation: Partial<Location> }>) => {
      const { id, updatedLocation } = action.payload;
      const location = state.locations.find((loc) => loc.id === id);
      if (location) {
        Object.assign(location, updatedLocation);
      }
    },
  },
});

export const { addLocation, updateLocation } = actions;

export default reducer;