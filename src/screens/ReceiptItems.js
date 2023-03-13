import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable} from 'react-native';
import axios from 'axios';

export default function ReceiptItems() {
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
    justifyContent: 'top', // Doesn't work on android
  },
});
