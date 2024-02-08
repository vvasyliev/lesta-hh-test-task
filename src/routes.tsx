import { Navigate } from 'react-router-dom';

import { RootPage, VehiclesPage } from '~/pages';

export const routes = [
  {
    path: '/',
    element: <RootPage />,
    children: [{
      index: true,
      element: <VehiclesPage />
    }]
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
