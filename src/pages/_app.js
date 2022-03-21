import App from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../layout";
import GlobalTheme from "../styles/GlobalTheme";
import { parseCookies } from "../utils/commonUtils";
import AppStateProvider from "../context/AppStateProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/global.css";

function MyApp({ Component, pageProps, appCookies, env }) {
    const [queryClient] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 20,
            },
        },
    }));
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GlobalTheme>
                    <AppStateProvider appCookies={appCookies} env={env}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AppStateProvider>
                </GlobalTheme>
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
        </>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const reqObj = appContext?.ctx?.req;
    return {
        ...appProps,
        appCookies: parseCookies(reqObj),
        env: process.env.NODE_ENV
    };
};

export default MyApp;
