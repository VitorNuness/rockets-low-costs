import { Error } from "@/components/error";
import HomeImage from "@/components/images/home_image";
import AuthDataService from "@/services/AuthDataService";
import SessionService from "@/services/SessionService";
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
    const [nameValue, setNameValue] = useState("");
    const [ageValue, setAgeValue] = useState("");
    const [errors, setErrors] = useState([]);

    async function handleSubmit() {
        try {
            const age = parseInt(ageValue);
            const name = nameValue;
            const response = await AuthDataService.register({ name, age });

            await SessionService.setUserInSession(response.data.name);

            setNameValue("");
            setAgeValue("");
        } catch (error: any) {
            setErrors(error?.response?.data?.message);
            setTimeout(() => {
                setErrors([]);
            }, 5000);
        }
    }

    return (
        <Container paddingTop={"12vh"}>
            <Error
                title="Erro ao cadastrar!"
                description={errors}
                isVisible={errors?.length > 0}
            />
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
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            placeholder="Digite seu nome"
                        />
                        <NumberInput
                            width={"100%"}
                            size={"lg"}
                            value={ageValue}
                            onChange={(value) => setAgeValue(value)}
                        >
                            <NumberInputField placeholder="Digite sua idade" />
                        </NumberInput>
                        <Button onClick={handleSubmit}>Cadastrar</Button>
                    </VStack>
                </FormControl>
            </VStack>
        </Container>
    );
}
