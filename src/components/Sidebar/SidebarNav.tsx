import { Stack } from '@chakra-ui/react';
import { RiDraftLine, RiUserLine } from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Arquitetos">
        <NavLink icon={RiUserLine}>Lista de arquitetos</NavLink>
      </NavSection>
      <NavSection title="Solicitações">
        <NavLink icon={RiDraftLine}>Suas Solicitações</NavLink>
      </NavSection>
    </Stack>
  );
}
