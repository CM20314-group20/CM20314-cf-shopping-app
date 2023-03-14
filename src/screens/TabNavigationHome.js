import React, { useState, useEffect } from 'react';
// import { SearchBar } from '@rneui/themed';
import { StyleSheet, View, Text, Dimensions, Pressable, Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from "axios";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Social from './Social';
import Settings from './Settings';
import ShoppingList from './ShoppingList';
import ReceiptScanner from './ReceiptScanner';
import ReceiptItems from './ReceiptItems';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IonIcon from 'react-native-vector-icons/Ionicons';


export default function H() {
  const [cfData, setcfData] = useState([])
  const Separator = () => <View style={styles.separator} />;

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <>
        
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

      
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'top', // Doesn't work on android
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
