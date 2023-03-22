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
          <Pressable style={styles.goHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.homeButtonText}>Go to Home page</Text>
          </Pressable>
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
  goHomeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
    position: 'relative',
  },
  homeButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
