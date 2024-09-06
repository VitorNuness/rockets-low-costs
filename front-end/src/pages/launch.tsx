import Container from "@/components/layouts/container";
import Header from "@/components/layouts/header";
import RocketService from "@/services/RocketService";
import {
    Button,
    Card,
    CardBody,
    FormControl,
    Grid,
    GridItem,
    Heading,
    Image,
    Input,
    NumberInput,
    NumberInputField,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Launch() {
    const router = useRouter();
    const [profitValue, setProfitValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [dateType, setDateType] = useState(false);
    const [rocket, setRocket] = useState<any>(null);

    useEffect(() => {
        async function getRocket() {
            const rocket = await RocketService.getRocket();

            if (!rocket) {
                router.push("/");
                return;
            }

            setRocket(rocket);
        }
        getRocket();
    }, []);

    return (
        <Container>
            <Header afterUser=", selecione lucro e data de lançamento" />
            <Grid
                templateColumns={{ lg: "repeat(2,1fr)" }}
                gap={10}
                marginTop={"12vh"}
            >
                <GridItem>
                    <Text fontSize={"xl"} marginBottom={12}>
                        Foguete selecionado:
                    </Text>
                    <Card variant={"outline"} maxWidth={"sm"}>
                        <CardBody>
                            <Image
                                src={rocket?.image}
                                alt={
                                    "Imagem do foguete está disponível em: " +
                                    rocket?.image
                                }
                                borderRadius="lg"
                                boxSize={"sm"}
                            />
                            <Stack mt="6" w={"xs"} spacing="2vh">
                                <Heading size="md">{rocket?.name}</Heading>
                                <Text fontSize={"lg"}>{rocket?.engine}</Text>
                                <Text fontSize={"lg"}>
                                    {rocket?.cost?.toLocaleString("pt-br", {
                                        style: "currency",
                                        currency: "EUA",
                                    })}
                                </Text>
                                <Text fontSize={"lg"}>
                                    Situação:{" "}
                                    {rocket?.status ? "Ativo" : "Inativo"}
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem>
                    <Text fontSize={"xl"} marginBottom={12}>
                        Data e lucro:
                    </Text>
                    <Card variant={"outline"} maxWidth={"xl"}>
                        <CardBody>
                            <FormControl>
                                <VStack spacing={4}>
                                    <NumberInput
                                        width={"100%"}
                                        size={"lg"}
                                        value={profitValue}
                                        onChange={(value) =>
                                            setProfitValue(value)
                                        }
                                    >
                                        <NumberInputField placeholder="Informe o % de lucro desejado" />
                                    </NumberInput>
                                    <Input
                                        type={dateType ? "date" : "text"}
                                        onFocus={() => setDateType(!dateType)}
                                        value={dateValue}
                                        onChange={(e) =>
                                            setDateValue(e.target.value)
                                        }
                                        placeholder="Selecione a data do lançamento"
                                    />
                                </VStack>
                                <Button>Realizar lançamento</Button>
                            </FormControl>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Container>
    );
}
