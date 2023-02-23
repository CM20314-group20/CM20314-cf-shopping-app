import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  
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
