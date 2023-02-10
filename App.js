import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Home from './src/pages/Home';
import Social from './src/pages/Social';
export default function App() {
  
  const [update, setUpdate] = useState("")
  const Stack = createNativeStackNavigator();
  // const MyStack = () => {
    return (
      <>
      <Text>hi</Text>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Social"
          component={Social}
          options={{title: 'Social'}}
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





