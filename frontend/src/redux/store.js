// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import authSlice from "./authSlice";
import companySlice from './companySlice'
import applicationSlice from "./applicationSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔥 1. Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company : companySlice,
  application: applicationSlice
});

// 🔥 2. Persist Configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["job"], // Optional: Don't persist jobSlice if not needed
};

// 🔥 3. Apply Persist to Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔥 4. Configure Store with Persisted Reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 🔥 5. Create Persistor
export const persistor = persistStore(store);

// 🔥 6. Purge Persistor to Clear State After Logout/Delete
export const purgePersistor = () => {
  persistor.purge(); // Clear persisted state from localStorage
  localStorage.removeItem("persist:root"); // Optional cleanup
};
