import HomeImage from "@/components/images/home_image";
import {
    Button,
    Center,
    Container,
    FormControl,
    Input,
    NumberInput,
    NumberInputField,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    function handleSubmit() {
        console.log("teste");
    }

    return (
        <Container paddingTop={"12vh"}>
            <Center>
                <HomeImage />
            </Center>
            <VStack paddingX={12} spacing={4} alignItems={"start"}>
                <Text fontSize="2xl" marginTop={10}>
                    Cadastrar
                </Text>
                <FormControl>
                    <VStack spacing={4}>
                        <Input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Digite seu nome"
                        />
                        <NumberInput
                            width={"100%"}
                            size={"lg"}
                            min={1}
                            max={110}
                        >
                            <NumberInputField
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }}
                                placeholder="Digite sua idade"
                            />
                        </NumberInput>
                        <Button onClick={handleSubmit}>Cadastrar</Button>
                    </VStack>
                </FormControl>
            </VStack>
        </Container>
    );
}
