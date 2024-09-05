import "@/styles/globals.css";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
    defaultButton,
    defaultCard,
    defaultInput,
    defaultLink,
} from "@/components";

const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    components: {
        Button: defaultButton,
        Card: defaultCard,
        Input: defaultInput,
        Link: defaultLink,
        NumberInput: defaultInput,
        NumberInputField: defaultInput,
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
