import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

export default function Social() {
  
  const [update, setUpdate] = useState("")
  const Separator = () => <View style={styles.separator} />;
  return (
    <>
    <View style={styles.groupbuttons}>
      <Separator />

      <Pressable style={styles.leavegroup}>
        <Text style={styles.text}>Leave Group</Text>
      </Pressable>
      
      <Separator />

      <Pressable style={styles.joingroup}>
        <Text style={styles.text}>Join Group</Text>
      </Pressable>

      <Separator />

      <Pressable style={styles.creategroup}>
        <Text style={styles.text}>Create Group</Text>
      </Pressable>

      <Separator />

      <Pressable style={styles.groupid}>
        <Text style={styles.text}>Group ID : placeholder</Text>
      </Pressable>

      <Separator />
    </View>    
    </>
  );
}

const styles = StyleSheet.create({
  groupbuttons: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
  leavegroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  joingroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  creategroup: {
    alignItems: 'center',
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
  groupid: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'darkgrey',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  // text: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: 'bold',
  //   letterSpacing: 0.25,
  //   color: 'white',
  // },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});