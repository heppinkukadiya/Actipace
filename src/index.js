import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { RecoilRoot, useSetRecoilState } from "recoil";

// ✅ PayPal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// ✅ Atom
import { Currency } from "./Atoms"; // adjust path if needed

const root = ReactDOM.createRoot(document.getElementById("root"));

function CurrencyLoader({ children }) {
    const setCurrency = useSetRecoilState(Currency);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const detect = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();

                const cur = data?.country_code === "IN" ? "INR" : "USD";
                setCurrency(cur);
            } catch (err) {
                setCurrency("USD");
            } finally {
                setLoaded(true);
            }
        };

        detect();
    }, [setCurrency]);

    if (!loaded) return null; // or loader

    return children;
}

function RootApp() {

    return (
        <React.StrictMode>
            <RecoilRoot>
                <CurrencyLoader>
                    <PayPalScriptProvider
                        options={{
                            "client-id": process.env.PAYPAL_CLIENT_ID,
                            currency: "USD",
                        }}
                    >
                        <App />
                    </PayPalScriptProvider>
                </CurrencyLoader>
            </RecoilRoot>

            <Toaster />
        </React.StrictMode>
    );
}

root.render(<RootApp />);
reportWebVitals();
