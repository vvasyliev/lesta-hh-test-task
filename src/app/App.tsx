import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import '~/app/App.css';

function App() {
  return (
    <AppShell>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
