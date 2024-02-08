import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Header } from '~/components/header';

export const RootPage = () => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>
      <Header />
    </AppShell.Header>
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);
