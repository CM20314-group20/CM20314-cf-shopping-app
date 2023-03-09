import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function LoadingScreen() {
  
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'black',
    flex: 0.2,
    alignItems: 'center',
    paddingHorizontal: 30,
    fontSize: 15,
  }
});
