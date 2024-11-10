"use client";

import { useEffect, useState } from "react";
import { Provider as PersistedProvider } from "react-redux";
import { Provider as CommonProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore as makePersistedStore } from "../lib/store/persistedStore";
import { makeStore as makeCommonStore } from "@/lib/store/commonStore";

//NOTE: When StoreProvide render in client side only then makeStore() will call. (Safe for SSR)
export default function StoreProvider({ children }) {
  const [persistedStoreReady, setPersistedStoreReady] = useState(false);
  const [commonStoreReady, setCommonStoreReady] = useState(false);

  const [storePersistedData, setStorePersistedData] = useState(null);
  const [storeCommonData, setStoreCommonData] = useState(null);

  // Make store in every request
  useEffect(() => {
    const persistedStore = makePersistedStore();
    const commonStore = makeCommonStore();

    if (persistedStore && commonStore) {
      // Set the store when it's ready
      setStorePersistedData(persistedStore);
      setStoreCommonData(commonStore);

      // Mark store as ready once it's initialized
      setPersistedStoreReady(true);
      setCommonStoreReady(true);
    }
  }, []);

  // Not to ready state
  if (
    (!persistedStoreReady && !commonStoreReady) ||
    (!storePersistedData && !storeCommonData)
  ) {
    return null;
  }

  // Ready state
  return (
    <PersistedProvider store={storePersistedData.store}>
      <PersistGate loading={null} persistor={storePersistedData.persistor}>
        <CommonProvider store={storeCommonData}>{children}</CommonProvider>
      </PersistGate>
    </PersistedProvider>
  );
}
