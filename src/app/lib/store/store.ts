import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LocationReducer from "@/lib/store/locationSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["locations"],
};
const persistedLocationReducer = persistReducer(persistConfig, LocationReducer);
export const store = configureStore({
  reducer: {
    location: persistedLocationReducer,
  },
});
export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
