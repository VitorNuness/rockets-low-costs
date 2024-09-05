import { defineStyleConfig } from "@chakra-ui/react";

export const defaultInput = defineStyleConfig({
    variants: {
        outline: {
            root: {
                width: "100%",
                size: "lg",
            },
            field: {
                width: "100%",
                size: "lg",
                fontSize: "md",
                paddingY: 7,
                paddingX: 3,
                borderColor: "#CDCDCD",
                _placeholder: {
                    color: "#2B2D2F",
                    fontSize: "md",
                },
                _focus: {
                    borderColor: "#1D3558",
                    ring: false,
                },
                _hover: {
                    borderColor: "#457B9D",
                    color: "#2B2D2F",
                },
            },
        },
    },
});
