import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Home from './src/pages/Home';
import Social from './src/pages/Social';
import BarcodeScanner from './src/pages/BarcodeScanner';
import ReceiptScanner from './src/pages/ReceiptScanner';
import Settings from './src/pages/Settings';
import ShoppingList from './src/pages/ShoppingList';

export default function App() {
  
  const [update, setUpdate] = useState("")
  const Stack = createNativeStackNavigator();
    return (
      <>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
        
        <Stack.Screen
          name="ReceiptScanner"
          component={ReceiptScanner}
          options={{title: 'Receipt Scanner'}}
        />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanner}
          options={{title: 'Barcode Scanner'}}
        />
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{title: 'Shopping List'}}
        />
        <Stack.Screen
          name="Social"
          component={Social}
          options={{title: 'Social'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
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