import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children }: any) {
    return (
        <ChakraContainer maxW={"90%"} paddingTop={"10vh"}>
            {children}
        </ChakraContainer>
    );
}
