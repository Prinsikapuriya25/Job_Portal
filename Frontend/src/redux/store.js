import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

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

// IMPORTANT
import storage from "redux-persist/lib/storage";

const asyncStorage =
  storage && typeof storage.getItem === "function"
    ? storage
    : {
        getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
        setItem: (key, value) =>
          Promise.resolve(window.localStorage.setItem(key, value)),
        removeItem: (key) =>
          Promise.resolve(window.localStorage.removeItem(key)),
      };

const persistConfig = {
  key: "root",
  storage: asyncStorage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application:applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
