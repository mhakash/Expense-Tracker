import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './src/hooks/useAuth';
import AppRoot from './src/screens/AppRoot';

const App = () => {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
};

export default App;
