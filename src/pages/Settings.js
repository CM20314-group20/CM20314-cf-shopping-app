import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable} from 'react-native';
export default function Settings() {
  const Separator = () => <View style={styles.separator} />;
  return (
    <>
    <View style={styles.input}>
      <Text style = {styles.text}> Username:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />
      <Text style = {styles.text}> Email:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />

      <Text style = {styles.text}> Phone No.:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />
      <Text style = {styles.text}> Data Metric:   </Text>

      

      <Pressable style={styles.Savebutton}>
        <Text style={styles.text}>Save Changes</Text>
      </Pressable>
      <Separator />
      <Pressable style={styles.Cancelbutton}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>
      <Separator />
      <Pressable style={styles.resetbutton}>
        <Text style={styles.text1}>Reset Password</Text>
      </Pressable>
      <Separator />
      <Pressable style={styles.resetbutton}>
        <Text style={styles.text2}>Delete Account</Text>
      </Pressable>
    </View>
    
    </>
    
  );
}

const styles = StyleSheet.create({
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
  },
  Savebutton: {
    alignItems: 'right',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
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
