import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

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
  locations: JSON.parse(localStorage.getItem('locations')) || [],
};

const { reducer, actions } = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      const newLoc = { ...action.payload, id: v4() };

      state.locations.push(newLoc);

      localStorage.setItem('locations', JSON.stringify(state.locations));

      toast.success('Yeni Lokasyon Oluşturuldu');
    },

    updateLocation: (
      state,
      action: PayloadAction<{ id: string; updatedLocation: Partial<Location> }>
    ) => {
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
