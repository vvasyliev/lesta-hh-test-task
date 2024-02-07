import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

import { VehiclesPage } from '~/pages/vehicles';
import { RootPage } from '~/pages/root';

const client = new ApolloClient({
  uri: 'https://vortex.korabli.su/api/graphql/glossary/',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [{
      path: '/vehicles',
      element: <VehiclesPage />
    }]
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
  );
}

export default App;
