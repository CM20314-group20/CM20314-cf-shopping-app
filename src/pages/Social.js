import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

export default function Social() {
  
  const [update, setUpdate] = useState("")
  const Separator = () => <View style={styles.separator} />;
  return (
    <>
    <View style={styles.container}>
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
  leavegroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  joingroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  creategroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lawngreen',
  },
  text: {
    fontSize: 16,
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