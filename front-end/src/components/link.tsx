import { defineStyleConfig } from "@chakra-ui/react";

export const defaultLink = defineStyleConfig({
    baseStyle: {
        color: "#2B2D2F",
        _hover: {
            color: "#457B9D",
            textDecoration: "none",
        },
    },
});
