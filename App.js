import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import TabNavigationHome from './src/screens/TabNavigationHome';
import Social from './src/screens/Social';
import Settings from './src/screens/Settings';
import ShoppingList from './src/screens/ShoppingList';
import ReceiptScanner from './src/screens/ReceiptScanner';
import ReceiptItems from './src/screens/ReceiptItems';
import LoadingScreen from './src/components/LoadingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native-web';

export default function App() {

  const [update, setUpdate] = useState("")
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main Navigation"
          component={TabNavigationHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Receipt Items"
          component={ReceiptItems}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});