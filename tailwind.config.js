/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                white: "#FFFFFF",
                primary: "#3D38ED",
                background: "#F5F5F5",
                secondary: "#C9C8FA",
                dark: "#141518",
                black: {
                    DEFAULT: "#000",
                    100: "#1E1E2D",
                    200: "#232533",
                },
                gray: {
                    DEFAULT: "#626D77",
                    100: "#D8DCE2",
                },
            },
            fontFamily: {
                pThin: ["Poppins-Thin", "sans-serif"],
                pExtraLight: ["Poppins-ExtraLight", "sans-serif"],
                pLight: ["Poppins-Light", "sans-serif"],
                pRegular: ["Poppins-Regular", "sans-serif"],
                pMedium: ["Poppins-Medium", "sans-serif"],
                pSemibold: ["Poppins-SemiBold", "sans-serif"],
                pBold: ["Poppins-Bold", "sans-serif"],
                pExtraBold: ["Poppins-ExtraBold", "sans-serif"],
                pBlack: ["Poppins-Black", "sans-serif"],
            },
        },
    },
    plugins: [],
}

