import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const GamePage = lazy(() =>
  import('@/pages/GamePage').then((module) => ({ default: module.GamePage }))
);
const FavoritesPage = lazy(() =>
  import('@/pages/FavoritesPage').then((module) => ({ default: module.FavoritesPage }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'game/:id',
          element: <GamePage />,
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
      ],
    },
  ],
  {
    basename: '/video-games-catalog',
  }
);
