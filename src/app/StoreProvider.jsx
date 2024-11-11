"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/lib/store/store";

//NOTE: When StoreProvide render in client side only then makeStore() will call. (Safe for SSR)
export default function StoreProvider({ children }) {
  const [storeReadyStatus, setStoreReadyStatus] = useState(false);
  const [storeData, setStoreData] = useState(null);

  // Make store in every request
  useEffect(() => {
    const store = makeStore();

    if (store) {
      setStoreData(store); // Set the store when it's ready
      setStoreReadyStatus(true); // Mark store as ready once it's initialized
    }
  }, []);

  // Not to ready state
  if (!storeReadyStatus && !storeData) {
    return null;
  }

  // Ready state
  return (
    <Provider store={storeData.store}>
      <PersistGate loading={null} persistor={storeData.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
