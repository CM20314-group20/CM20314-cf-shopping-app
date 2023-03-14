import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ScannedItem from '../components/ScannedItem';

export default function ReceiptItems(args) {
  items = args["route"]["params"]["data"];
  const [update, setUpdate] = useState("")
  const navigation = useNavigation();
  return (
    <>
        <View style={styles.container}>
          <ScannedItem style={styles.scanneditems} data={items} />
        </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'top', // Doesn't work on android
  },
});
