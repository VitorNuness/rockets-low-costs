import Container from "@/components/layouts/container";
import Header from "@/components/layouts/header";
import { LaunchInterface } from "@/interfaces/launch.interface";
import LaunchDataService from "@/services/LaunchDataService";
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
    const [profitValue, setProfitValue] = useState(null);
    const [dateValue, setDateValue] = useState(null);
    const [dateType, setDateType] = useState(false);
    const [rocket, setRocket] = useState<any>(null);
    const [launch, setLaunch] = useState<LaunchInterface | null>(null);

    async function createOrUpdateLaunch() {
        try {
            if (launch) {
                await LaunchDataService.updateUserLaunchProfit({
                    launchId: launch._id,
                    profit: profitValue,
                }).then(() => {
                    router.push("/launches");
                    return;
                });
            } else {
                const launchData = {
                    id: launch?.id ?? null,
                    rocket: {
                        name: rocket?.name,
                        engine: rocket?.engine,
                        cost: rocket?.cost,
                        image: rocket?.image,
                        status: rocket?.status,
                    },
                    mission: {
                        name: rocket?.mission,
                        year: rocket?.mission_year,
                    },
                    profit: profitValue ? parseInt(profitValue) : null,
                    date: dateValue ?? Date.now().toString(),
                    status: launch?.status ?? false,
                };

                await LaunchDataService.createUserLaunch(launchData).then(
                    () => {
                        router.push("/launches");
                        return;
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getData() {
            const rocket = await RocketService.getRocket();
            const launch = await LaunchDataService.getLaunch();
            setLaunch(launch);
            if (launch) {
                setRocket(launch?.rocket);
                setDateType(true);
                setProfitValue(launch?.profit?.toString());
                return;
            }

            if (!rocket) {
                router.push("/");
                return;
            }
            setRocket(rocket);
        }
        getData();
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
                                        value={profitValue ?? ""}
                                        onChange={(value) =>
                                            setProfitValue(value)
                                        }
                                    >
                                        <NumberInputField placeholder="Informe o % de lucro desejado" />
                                    </NumberInput>
                                    <Input
                                        type={dateType ? "date" : "text"}
                                        onFocus={() => setDateType(!dateType)}
                                        value={dateValue ?? ""}
                                        onChange={(e: any) =>
                                            setDateValue(e.target.value)
                                        }
                                        placeholder="Selecione a data do lançamento"
                                    />
                                </VStack>
                                <Button onClick={() => createOrUpdateLaunch()}>
                                    Realizar lançamento
                                </Button>
                            </FormControl>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Container>
    );
}
