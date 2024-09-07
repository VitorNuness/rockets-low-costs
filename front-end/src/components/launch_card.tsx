import LaunchDataService from "@/services/LaunchDataService";
import RocketService from "@/services/RocketService";
import {
    Card,
    CardBody,
    Stack,
    Heading,
    Button,
    Image,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function LaunchCard(data: { launch: any }) {
    const router = useRouter();
    const rocket = data.launch.rocket;

    async function openLaunch() {
        await LaunchDataService.saveLaunch(data.launch).then(() => {
            router.push("/launch");
            router.reload();
        });
    }

    return (
        <Card variant={"outline"}>
            <CardBody>
                <Image
                    src={rocket.image}
                    alt={rocket.name}
                    borderRadius="lg"
                    boxSize="xs"
                />
                <Stack mt="6" w={"xs"} spacing="2vh">
                    <Heading size="md">{rocket.name}</Heading>
                    <Text>{data.launch.mission.name}</Text>
                    <Text>{data.launch.mission.year}</Text>
                </Stack>
                <Button
                    isDisabled={!data.launch.status ?? null}
                    onClick={async () => await openLaunch()}
                >
                    {data.launch.status ? "Lançado" : "Não lançado"}
                </Button>
            </CardBody>
        </Card>
    );
}
