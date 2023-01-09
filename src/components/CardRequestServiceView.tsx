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
import {
  ServiceRequest,
  useGetUserByIdQuery,
} from '../graphql/generated/graphql';
import { BadgeStatus } from './BadgeStatus';

interface ICardRequestServiceViewProps {
  request: ServiceRequest;
}

export function CardRequestServiceView({
  request,
}: ICardRequestServiceViewProps) {
  const router = useRouter();
  const { data: client } = useGetUserByIdQuery({
    variables: { id: (request.cRequestId as string) ?? '' },
  });
  return (
    <Card maxW="sm" width="100%">
      <CardBody>
        <Stack spacing="3" pt="15px">
          <BadgeStatus
            position="absolute"
            top="0"
            left="14px"
            status={request.status}
          />
          <Heading size="md">{request.title}</Heading>
          <Text>{request.description}</Text>
          <Text fontSize="12" color="gray.500">
            Solicitante: {client?.userById.name}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justify="flex-end">
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => router.replace(`/architect/view/${request.id}`)}
        >
          Analisar solicitação
        </Button>
      </CardFooter>
    </Card>
  );
}
