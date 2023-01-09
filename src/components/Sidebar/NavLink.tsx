import { Icon, Link as ChakraLink, Text, LinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';

interface INavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: INavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="2" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
