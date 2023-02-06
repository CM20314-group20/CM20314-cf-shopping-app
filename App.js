import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
      <Text>Enter Text Below:</Text>
      <TextInput placeholder="Enter" onChangeText={e => setUpdate(e)}></TextInput>
      <Text style={{color: '#F10'}}>Below is real time update:</Text>
      <Text>{update}</Text>
      <StatusBar style="auto" />
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
