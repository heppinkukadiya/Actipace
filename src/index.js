import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

// ✅ PayPal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <PayPalScriptProvider
                options={{
                    "client-id": "ARIIvWWyxIILPuos_jcKUqlT1_m0ewcfvQWaccT9J62efYSl1SpOKRrfIIH2CWsJfGO9Ep9nQWbxPaEK",
                    currency: "USD",
                }}
            >
                <App />
            </PayPalScriptProvider>
        </RecoilRoot>

        <Toaster />
    </React.StrictMode>
);

reportWebVitals();
