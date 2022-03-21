const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
    },
    colors: {
        primary1: "#97268F",
        background1: "#FEFBFE",
        background2: "#4A1346",
        background3: "#FCFCFD",
        background4: "#DFE1E6",
        background5: "#EBECF0",
        background6: "#9FADC6",
        background7: "#FCF3FB",
        background8: "#F0F0F1",
        background9: "#9F9F9F",
        background10: "#F5E9F4",
        background11: "#FAFBFC",
        background12: "#F8DFF7",
        text1: "#42526E",
        text2: "#091E42",
        text3: "#253858",
        "background-black": "#1C1C1C",
        ...colors
    },
    fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
        custom1: ["40px", "60px"],
        ...defaultTheme.fontSize
    },
    extend: {
        boxShadow: {
            buttonshadow: "0px 100px 161px rgba(151, 38, 143, 0.08), 0px 64.8148px 94.2894px rgba(151, 38, 143, 0.0607407), 0px 38.5185px 51.2815px rgba(151, 38, 143, 0.0485926), 0px 20px 26.1625px rgba(151, 38, 143, 0.04), 0px 8.14815px 13.1185px rgba(151, 38, 143, 0.0314074), 0px 1.85185px 6.33565px rgba(151, 38, 143, 0.0192593)",
            buttonshadow2: "0px 8.14815px 13.1185px rgba(151, 38, 143, 0.0314074), 0px 1.85185px 6.33565px rgba(151, 38, 143, 0.0192593)",
            cardshadow: "0px 0px 14px rgba(151, 38, 143, 0.06), 0px 0px 100px rgba(151, 38, 143, 0.02)",
            cardshadow1: "0px 0px 100px rgba(0, 0, 0, 0.01), 0px 16px 120px rgba(0, 0, 0, 0.02)"
        },
        spacing: {
            "128": "32rem",
            "144": "36rem",
        },
        borderRadius: {
            "4xl": "2rem",
        },
        lineHeight: {
            "extra-loose": "4rem"
        }
    }
};
