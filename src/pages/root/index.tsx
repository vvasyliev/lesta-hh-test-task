import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const RootPage = () => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>Header</AppShell.Header>
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);
