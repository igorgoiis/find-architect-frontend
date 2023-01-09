import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IUser } from '../shared/models/user.model';

interface ICardArquitect {
  architect: IUser;
}

export function CardArquitect({ architect }: ICardArquitect) {
  const router = useRouter();
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{architect.name}</Heading>
          <Text>{architect.bio}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justify="flex-end">
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() =>
            router.replace(`/client/request/create/${architect.id}`)
          }
        >
          Solictar serviço
        </Button>
      </CardFooter>
    </Card>
  );
}
