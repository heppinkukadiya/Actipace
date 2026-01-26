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
                            "client-id":
                                "AYLxK_A1L503hPHQTES--LW1Q2_bfRk5rBDh5f2dtGzi0H9odMJ29TsVbigzIQMWFavCUWcH4-M_1Wiz",
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
