import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// This function creates a new store for per request
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
