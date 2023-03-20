import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function Settings() {
  const Separator = () => <View style={styles.separator} />;
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dataMetric, setDataMetric] = React.useState("");

  // const ip = "192.168.1.94";
  const ip = "138.38.175.198";
  const port = 4000;

  const data = [
      {key:'1', value:'Miles Driven'},
      {key:'2', value:'Trees Saved'},
      {key:'3', value:'Pure CO2 emissions'},
  ]

  async function postData(username, email, data_metric) {
    
    try {
      // await axios.post('http://127.0.0.1:5000/settings', {
      await axios.post('http://' + ip + ':' + port + '/settings', {
        username: username,
        email: email,
        data_metric: data_metric
      })
    }
    catch(err) {
      console.log(err);
    }
  }
  
  return (
    <>
    <View style={styles.input}>
      <Text style = {styles.text}> Username:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. user1"
        onChangeText={text => setUsername(text)}
      />
      <Text style = {styles.text}> Email:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. username@gmail.com"
        onChangeText={text => setEmail(text)}
      />
    </View>
    
    <View style={styles.savechanges}>
      <Pressable style={styles.Savebutton} onPress={() => {
        postData(username, email, dataMetric);
        Alert.alert("Changes Saved");
      }}>
        <Text style={styles.text}>Save Changes</Text>
      </Pressable>
      <Separator />
      <Pressable style={styles.Cancelbutton}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>
    </View>

    {/* <View style={styles.input}>
      <Separator />
      <Pressable style={styles.resetbutton}>
        <Text style={styles.text1}>Reset Password</Text>
      </Pressable>
      <Separator />
      <Pressable style={styles.resetbutton}>
        <Text style={styles.text2}>Delete Account</Text>
      </Pressable>
    </View> */}

    <View style={styles.dropdown}>
    <Text style={styles.text}>Data Metric:</Text>
      <SelectList 
        setSelected={(val) => setDataMetric(val)} 
        onSelect={() => {}}
        data={data} 
        save="value"
        />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginHorizontal: 160,
    marginVertical: 200,
  },
  savechanges: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserinputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, 
    fontSize: 16,
  },
  input: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    position: 'relative',
  },
  input2: {
    flexDirection: 'column',
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'left', // Doesn't work on android
    justifyContent: 'top',
  },
  Savebutton: {
    alignItems: 'center', // Doesn't work on android
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lawngreen',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
    Cancelbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 45,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'yellow',
      shadowColor: 'darkgrey',
      shadowOpacity: 1.5,
      elevation: 8,
      shadowRadius: 5 ,
      shadowOffset : { width: 1, height: 5},
  },
  Resetbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
},
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'blue',
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
