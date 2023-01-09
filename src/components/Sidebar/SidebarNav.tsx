import { Stack } from '@chakra-ui/react';
import { RiDraftLine, RiUserLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../shared/models/enums/roles.enum';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { user } = useAuth();

  if (user?.role === Role.Client) {
    return (
      <Stack spacing="12" align="flex-start">
        <NavSection title="Arquitetos">
          <NavLink href="/client/architect" icon={RiUserLine}>
            Lista de arquitetos
          </NavLink>
        </NavSection>
        <NavSection title="Solicitações">
          <NavLink href="/client/request" icon={RiDraftLine}>
            Suas Solicitações
          </NavLink>
        </NavSection>
      </Stack>
    );
  }

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/architect" icon={RiDraftLine}>
          Solicitações
        </NavLink>
      </NavSection>
    </Stack>
  );
}
