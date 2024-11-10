"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

//NOTE: When StoreProvide render in client side only then makeStore() will call. (Safe for SSR)
export default function StoreProvider({ children }) {
  const [storeReady, setStoreReady] = useState(false);
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const store = makeStore();
    setStoreData(store); // Set the store when it's ready
    setStoreReady(true); // Mark store as ready once it's initialized
  }, []);

  if (!storeReady || !storeData) {
    return null; // Optionally return a loader here while waiting for the store to initialize
  }

  return (
    <PersistGate persistor={storeData.persistor} loading={null}>
      <Provider store={storeData.store}>{children}</Provider>
    </PersistGate>
  );
}
