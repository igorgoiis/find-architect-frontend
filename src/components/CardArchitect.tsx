import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IUser } from '../shared/models/user.model';

interface ICardArquitect {
  architect: IUser;
}

export function CardArquitect({ architect }: ICardArquitect) {
  return (
    <Card maxW="sm">
      <CardBody>
        {/* <Image
          src="https://github.com/igorgoiis.png"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
        <Stack spacing="3">
          <Heading size="md">{architect.name}</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justify="flex-end">
        <Button variant="solid" colorScheme="blue">
          Solictar serviço
        </Button>
      </CardFooter>
    </Card>
  );
}
