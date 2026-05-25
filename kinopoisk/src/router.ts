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
import { FilteredFilmsPage } from './pages/FilteredFilmsPage';
import { FilmInfo } from './pages/FilmInfoPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ParseLinkPage } from './pages/ParseLinkPage';
import { ActivationPage } from './pages/ActivationPage';

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
        path: '/films/filters/:page',
        Component: FilteredFilmsPage
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
      },
      {
        path: 'film/:id',
        Component: FilmInfo
      },
      {
        path: '/signin',
        Component: SignInPage
      },
      {
        path: '/signup',
        Component: SignUpPage
      },
      {
        path: '/activate-link',
        Component: ParseLinkPage
      },
      {
        path: '/auth/activate/:uid/:token',
        Component: ActivationPage
      }
    ]
  },
]

export const router = createBrowserRouter(routes);