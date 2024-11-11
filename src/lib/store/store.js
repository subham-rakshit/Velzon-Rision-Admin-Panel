import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./features/user/userSlice";
import layoutReducer from "./features/layoutCustomizer/layoutCustomizerSlice";

// This function creates a new persist store for per request which data will store in localstorage
export const makeStore = () => {
  const rootReducer = combineReducers({
    user: persistReducer(
      {
        key: "user",
        storage,
        verision: 1,
      },
      userReducer // Persist reducer
    ),
    layout: layoutReducer, // Non-persist reducer
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
