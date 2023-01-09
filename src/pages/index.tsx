import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../shared/models/enums/roles.enum';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (user !== null) {
      if (user.role === Role.Client) {
        router.replace('/client/architect');
      }
      if (user.role === Role.Architect) {
        router.replace('/architect/');
      }
    } else {
      router.replace('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
