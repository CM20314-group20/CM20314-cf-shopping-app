import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function Settings() {
  
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
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
