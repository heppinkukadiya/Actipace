import  { useEffect } from 'react';
import toast from 'react-hot-toast';

const SmartsuppChat = () => {
    useEffect(() => {
        try{
        // Dynamically add the Smartsupp script
        const script = document.createElement('script');
        script.src = 'https://www.smartsuppchat.com/loader.js?';
        script.async = true;

        // Initialize the _smartsupp object
        script.onload = () => {
            window._smartsupp = window._smartsupp || {};
            window._smartsupp.key = 'bef598aedebb1a69759d2300d1421239b3d2a7ec';
        };

        // Append the script to the body
        document.body.appendChild(script);

        return () => {
            // Cleanup: Remove the script when the component is unmounted
            document.body.removeChild(script);
        };
    }catch(e){
        toast.error(e.message);
    }
    }, []);

    return null;
};

export default SmartsuppChat;