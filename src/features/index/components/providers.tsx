"use client";

import { Provider } from "react-redux";
import { store } from "@/redux-store/store";
import AppInit from "./app-init";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInit>
        {children}
      </AppInit>
    </Provider>
  );
}
