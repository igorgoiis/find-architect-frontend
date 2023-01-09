import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { ReactNode, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ISidebarDrawerProviderProps {
  children: ReactNode;
}
type SidebarDrawerContextData = UseDisclosureReturn;

export const SideBarDawerContext = createContext(
  {} as SidebarDrawerContextData,
);

export function SidebarDrawerProvider({
  children,
}: ISidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <SideBarDawerContext.Provider value={disclosure}>
      {children}
    </SideBarDawerContext.Provider>
  );
}
