import { ThemeProvider } from "styled-components";
import theme from "../../theme/default";

const GlobalTheme = ({ children }) => (
    <ThemeProvider theme={{ ...theme }}>
        {children}
    </ThemeProvider>
);

export default GlobalTheme;
