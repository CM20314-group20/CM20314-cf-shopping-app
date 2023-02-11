import React, {useState} from 'react';
import { StyleSheet, View, Button} from 'react-native';

export default function Home({navigation}) {
  
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
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
