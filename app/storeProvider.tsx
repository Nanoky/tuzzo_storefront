"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./_shared/lib/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    const persistor = useRef<any>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
        persistor.current = persistStore(storeRef.current);
    }
    //const persistor = persistStore(storeRef.current);
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor.current}>
                {children}
            </PersistGate>
        </Provider>
    );
}
