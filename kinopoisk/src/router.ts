import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { Test } from './pages/test';
import { Layout } from './components/Layout';
import { MoviePage } from './pages/MoviePage';
import { FavoriteMovies } from './pages/FavoriteMoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CollectionPage } from './pages/CollectionPage';
import { SearchResultsPage } from './pages/SearchResultPage';

const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: MoviePage,
      },
      {
        path: '/films',
        Component: MoviePage
      },
      {
        path: '/films/:page',
        Component: MoviePage
      },
      {
        path: '/favorites',
        Component: FavoriteMovies
      },
      {
        path: '/series',
        Component: SeriesPage
      },
      {
        path: '/series/:page',
        Component: SeriesPage
      },
      {
        path: '/collections',
        Component: CollectionsPage
      },
      {
        path: '/collections/:type/:page',
        Component: CollectionPage
      },
      {
        path: '/profile',
        Component: ProfilePage
      },
      {
        path: 'search/:query/:page',
        Component: SearchResultsPage
      }
    ]
  },
]

export const router = createBrowserRouter(routes);