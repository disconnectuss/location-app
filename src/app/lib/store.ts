import { configureStore } from '@reduxjs/toolkit'
import LocationReducer from '@/lib/slices/locationSlice'

export const store = () => {
	return configureStore({
		reducer: {
			location: LocationReducer
		}
	})
}

// Infer the type of store
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']