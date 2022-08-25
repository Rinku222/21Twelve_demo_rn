import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Home';
import {NavigationContainer} from '@react-navigation/native';
import Album from './src/Album';
import Photos from './src/Photos';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User Profile" component={Home} />
        <Stack.Screen name="User Album" component={Album} />
        <Stack.Screen name="User Photos" component={Photos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
