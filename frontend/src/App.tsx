import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RecruitAstronaut } from './pages/CreateOrEditAstronaut/RecruitAstronaut/RecruitAstronaut.tsx';
import { CreateOrEditAstronaut } from './pages/CreateOrEditAstronaut';
import { Cockpit } from './pages/Cockpit';
import { SpaceshipAdmin } from './pages/SpaceshipAdmin';

import { MessageCenterContainer } from './MessageCenterContainer.tsx';

import { SpaceTravelProvider } from './contexts/SpaceTravelContext.tsx';
import { SpaceshipProvider } from './contexts/SpaceshipContext.tsx';
import { MessageCenterProvider } from './contexts/MessageCenterContext.tsx';

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Cockpit />,
    },
    {
      path: '/spaceship-admin',
      element: <SpaceshipAdmin />,
    },
    {
      path: '/astronaut/create',
      element: <RecruitAstronaut />,
    },
    {
      path: '/astronaut/edit/:astronautId',
      element: <CreateOrEditAstronaut />,
    },
  ]);

  return (
    <React.StrictMode>
      <SpaceTravelProvider>
        <SpaceshipProvider>
          <MessageCenterProvider>
            <RouterProvider router={router} />
            <MessageCenterContainer />
          </MessageCenterProvider>
        </SpaceshipProvider>
      </SpaceTravelProvider>
    </React.StrictMode>
  );
}
