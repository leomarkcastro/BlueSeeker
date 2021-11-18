import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/app.navigator';

import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import { Provider } from 'react-redux';
import store from './src/service/redux/redux_init';

const App: React.FC = () => {

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
          <AppNavigator />
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);