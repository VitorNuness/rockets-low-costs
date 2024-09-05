import SessionService from "@/services/SessionService";
import { Button, Card, CardBody, Center, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AgeConfirmation() {
    const router = useRouter();
    const user: any = router?.query;

    async function handleSubmit() {
        await SessionService.setUserInSession(user?.name);

        router.push("/");
    }

    return (
        <Center height={"100vh"}>
            <Card
                width={"490px"}
                height={"374px"}
                variant={"outline"}
                borderColor={"#457B9D"}
            >
                <CardBody
                    flexDirection={"column"}
                    textAlign={"center"}
                    width={"100%"}
                >
                    <Text fontSize={"24px"}>Sua idade é:</Text>
                    <Text fontSize={"128px"}>{user?.age}</Text>
                    <Button marginBottom={4} onClick={handleSubmit}>
                        Confirmar
                    </Button>
                    <Link href="/auth/login">Cancelar</Link>
                </CardBody>
            </Card>
        </Center>
    );
}
