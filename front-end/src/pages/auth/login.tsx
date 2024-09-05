import {
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    Input,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Error, HomeImage } from "@/components";
import AuthDataService from "@/services/AuthDataService";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const [nameValue, setNameValue] = useState("");
    const [errors, setErrors] = useState([]);

    async function handleSubmit() {
        try {
            const name = nameValue;
            const response: any = await AuthDataService.login({ name });

            router.push({
                pathname: "/auth/age_confirmation",
                query: await response?.data,
            });

            setNameValue("");
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
                    Login
                </Text>
                <FormControl>
                    <VStack spacing={4}>
                        <Input
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            placeholder="Digite seu nome"
                        />
                    </VStack>
                    <Button onClick={handleSubmit}>Entrar</Button>
                </FormControl>
                <Flex
                    gap={4}
                    width={"100%"}
                    marginTop={10}
                    justifyContent={"center"}
                >
                    <Text>Não tem conta?</Text>
                    <Link href="/auth/register">Cadastrar-se aqui</Link>
                </Flex>
            </VStack>
        </Container>
    );
}
