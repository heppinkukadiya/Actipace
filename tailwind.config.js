const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                custom: '0px 30px 70px 0px #0005271A',
                custom2:'0px 16px 32px -16px #31BF5C52;',
                custom3:'0px 8px 16px 0px #0000001A'
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],

                // ⭐ ADD THIS
                kalam: ['Kalam', 'cursive'],
            },
            backgroundImage: {
                'radial-gradient1':'radial-gradient(50% 50% at 50% 50%, rgba(169, 101, 244, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                'radial-gradient2':'radial-gradient(50% 50% at 50% 50%, rgba(37, 155, 218, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                'radial-gradient3':'radial-gradient(50% 50% at 50% 50%, rgba(79, 192, 63, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                'flag-us': "url('https://flagcdn.com/w40/us.png')",
                'flag-in': "url('https://flagcdn.com/w40/in.png')",
                'flag-fr': "url('https://flagcdn.com/w40/fr.png')",
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.flag-icon': {
                    display: 'inline-block',
                    width: '32px',
                    height: '20px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                },
            });
        }),
    ],
};
