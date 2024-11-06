"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store/store";
// import { initialRender } from "@/lib/store/features/userDetails/userSlice";
import { PersistGate } from "redux-persist/integration/react";

//NOTE: When StoreProvide render in client side only then makeStore() will call. (Safe for SSR)
export default function StoreProvider({ children }) {
  const storeRef = useRef(); // store data has to be store here, because not to re-render

  //INFO: When storeRef is null, then store data has to be stored.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <PersistGate persistor={storeRef.current.persistor}>
      <Provider store={storeRef.current.store}>{children}</Provider>
    </PersistGate>
  );
}
