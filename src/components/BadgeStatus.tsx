import { Badge, BadgeProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { StatusService } from '../graphql/generated/graphql';

type IColorSchema = 'red' | 'yellow' | 'green';

interface IBadgeStatusProps extends BadgeProps {
  status: StatusService;
}

export function BadgeStatus({ status, ...rest }: IBadgeStatusProps) {
  const [colorSchema, setColorSchema] = useState<IColorSchema>('yellow');

  useEffect(() => {
    setColorSchema(
      status === StatusService.Requested
        ? 'yellow'
        : status === StatusService.Accepted
        ? 'green'
        : 'red',
    );
  }, [status]);

  return (
    <Badge
      ml="1"
      px="2"
      py="1"
      fontSize="16"
      fontWeight={400}
      colorScheme={colorSchema}
      textTransform="capitalize"
      {...rest}
    >
      {status === StatusService.Requested && 'Solicitada'}
      {status === StatusService.Accepted && 'Aceita'}
      {status === StatusService.Declined && 'Recusada'}
    </Badge>
  );
}
