import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'pipelines',
    loadComponent: () =>
      import('./features/pipelines/pipelines.component').then((m) => m.PipelinesComponent),
  },
  {
    path: 'tests',
    loadComponent: () => import('./features/tests/tests.component').then((m) => m.TestsComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./features/pokemon/list.component').then((m) => m.PokemonListComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./features/pokemon/detail.component').then((m) => m.PokemonDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
