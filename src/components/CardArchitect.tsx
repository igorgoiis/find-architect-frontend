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
import Link from 'next/link';
import { IUser } from '../shared/models/user.model';

interface ICardArquitect {
  architect: IUser;
}

export function CardArquitect({ architect }: ICardArquitect) {
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
        <Link href={`/client/request/create/${architect.id}`} passHref>
          <Button as="a" variant="solid" colorScheme="blue">
            Solictar serviço
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
