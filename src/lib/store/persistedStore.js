import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./features/user/userSlice";

// This function creates a new persist store for per request which data will store in localstorage
export const makeStore = () => {
  const rootReducer = combineReducers({
    user: userReducer,
  });

  const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
