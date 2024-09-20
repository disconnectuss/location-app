import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LocationReducer from "@/lib/slices/locationSlice";
const persistConfig = {
  key: "root",
  storage,
};
const persistedLocationReducer = persistReducer(persistConfig, LocationReducer);
export const store = configureStore({
  reducer: {
    location: persistedLocationReducer,
  },
});
export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
