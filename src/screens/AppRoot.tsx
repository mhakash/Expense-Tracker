import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeScreen} from './Home';
import {useAuth} from '../hooks/useAuth';
import LoginScreen from './LoginScreen';
import AddTransaction from './AddTransaction';

const Stack = createStackNavigator();

const App = () => {
  const auth = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        mode="card"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#222831',
          },

          headerTitleStyle: {
            color: '#eeeeee',
            fontSize: 16,
          },

          headerTintColor: '#eeeeee',
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
        {auth.user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{animationEnabled: true}}
            />
            <Stack.Screen name="Add transaction" component={AddTransaction} />
          </>
        ) : (
          <>
            <Stack.Screen name="Sign in" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
