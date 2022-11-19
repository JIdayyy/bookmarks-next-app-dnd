/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "src/context/AuthContext";
import { NextPage } from "next";

const client = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const getLayout = Component.getLayout || ((page: any) => page);

    return (
        <AuthProvider>
            <QueryClientProvider client={client}>
                <ChakraProvider theme={theme}>
                    {getLayout(<Component {...pageProps} />)}
                </ChakraProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default MyApp;
