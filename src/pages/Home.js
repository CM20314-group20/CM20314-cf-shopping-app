import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function Home({navigation}) {
  
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
      <Text>Enter Text Below:</Text>
      <TextInput placeholder="Enter" onChangeText={e => setUpdate(e)}></TextInput>
      <Text style={{color: '#F00'}}>Below is real time update:</Text>
      <Text>{update}</Text>
      <Button title="Receipt Scanner" onPress={() => navigation.navigate('ReceiptScanner', {name: 'ReceiptScanner'})}/>
      <Button title="Barcode Scanner" onPress={() => navigation.navigate('BarcodeScanner', {name: 'BarcodeScanner'})}/>
      <Button title="Shopping List" onPress={() => navigation.navigate('ShoppingList', {name: 'ShoppingList'})}/>
      <Button title="Social page" onPress={() => navigation.navigate('Social', {name: 'Social'})}/>
      <Button title="Settings" onPress={() => navigation.navigate('Settings', {name: 'Settings'})}/>
    </View>
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
