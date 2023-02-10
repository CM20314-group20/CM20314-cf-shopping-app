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
      <Button title="Social page" onPress={() => navigation.navigate('Social', {name: 'Social'})}/>
      
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
