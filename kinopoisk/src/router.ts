import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { Test } from './pages/test';
import { Layout } from './components/Layout';
import { MoviePage } from './pages/MoviePage';
import { FavoritesPage } from './pages/Favorite';
import { SeriesPage } from './pages/SeriesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProfilePage } from './pages/ProfilePage';

const routes: RouteObject[] = [
    {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: MoviePage,
      },
      {
        path: '/favorites',
        Component: FavoritesPage
      },
      {
        path: '/series',
        Component: SeriesPage
      },
      {
        path: '/collections',
        Component: CollectionsPage
      },
      {
        path: '/profile',
        Component: ProfilePage
      }
    ]
  },
]

export const router = createBrowserRouter(routes);