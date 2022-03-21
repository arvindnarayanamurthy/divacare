
const theme = require("./theme/default.js");
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: theme,
    plugins: [
        require("@tailwindcss/forms")
    ],
};
