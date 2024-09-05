import "@/styles/globals.css";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { defaultButton, defaultInput } from "@/components";

const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    components: {
        Button: defaultButton,
        Input: defaultInput,
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
