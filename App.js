import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import Social from './src/screens/Social';
import Settings from './src/screens/Settings';
import ShoppingList from './src/screens/ShoppingList';
import ReceiptScanner from './src/screens/ReceiptScanner';
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
        <Tab.Navigator screenOptions={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          tabBarStyle: {
            height: 90,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: 'rgba(34,36,40,1)',
            position: 'absolute',
            borderTopWidth: 0,
          },
        })}>
          <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({ size, color }) => (<Icon name={"home"} color={color} size={22} />
            )
          }}
          />
          <Tab.Screen name="Shopping List" component={ShoppingList} options={{
            tabBarIcon: ({ size, color }) => (<Icon name={"list-ul"} color={color} size={22} />)
          }} />
          <Tab.Screen name="Scanner" component={ReceiptScanner} options={{
            tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name={"barcode-scan"} color={color} size={22} />)
          }} />
          <Tab.Screen name="Social" component={Social} options={{
            tabBarIcon: ({ size, color }) => (<Icon name={"plus"} color={color} size={22} />)
          }} />
          <Tab.Screen name="Settings" component={Settings} options={{
            tabBarIcon: ({ size, color }) => (<Icon name={"cog"} color={color} size={22} />)
          }} />
        </Tab.Navigator>
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