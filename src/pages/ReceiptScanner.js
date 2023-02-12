import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BarcodeScanner from './BarcodeScanner';

export default function ReceiptScanner({navigation}) {
  
  const [update, setUpdate] = useState("")
  const Stack = createNativeStackNavigator();
  return (
    <>
    <View style={styles.barcodebutton}>
        <Button title="Barcode Scanner" onPress={() => navigation.navigate('BarcodeScanner')}/>    
    </View>
    
    </>
  );
}

const styles = StyleSheet.create({
  barcodebutton: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'middle',
    justifyContent: 'middle',
  },
});
