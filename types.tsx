import {Routes} from './src/routes/routes';
import {z} from 'zod';
import {liquidsSchema} from './src/api/schemas';

export type RouteParams = {
  [Routes.SettingsScreen]: undefined;
  [Routes.ProfileScreen]: undefined;
  [Routes.DashboardScreen]: undefined;
  [Routes.WelcomeScreen]: undefined;
};

export type liquidsList = z.infer<typeof liquidsSchema>;
