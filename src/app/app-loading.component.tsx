import Constants from 'expo-constants';

import * as ExpoComponent from './app-loading.component.expo';

export type TaskResult<T = any> = [string, T];
export type Task = () => Promise<TaskResult | null>;

const Component = ExpoComponent;

export const AppLoading = Component.AppLoading;
export const LoadFontsTask = Component.LoadFontsTask;
