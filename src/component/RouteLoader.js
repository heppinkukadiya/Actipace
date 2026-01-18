import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteLoader({ setLoading }) {
    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 400); // route loader delay

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return null;
}
