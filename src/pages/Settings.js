import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Dropdown from 'react-dropdown';

export default function Settings() {
  const Separator = () => <View style={styles.separator} />;
  const [update, setUpdate] = useState("")
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (category) => {
     setCategory(category);
     console.log(category);
 }
  return (
    <>
    <View style={styles.groupinput}>
      <Text style = {styles.text}> Username:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />
    </View>

    <View style={styles.groupinput}>

      <Text style = {styles.text}> Email:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />
    </View>
    <View style={styles.groupinput}>

      <Text style = {styles.text}> Phone No.:   </Text>
      <TextInput
        style={styles.UserinputBox}
        placeholder="Eg. User1"
      />
    </View>
    <View style={styles.groupinput}>
      <Text style = {styles.text}> Data Metric:   </Text>
      <select name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
            <option id="0" ><text>Personal</text></option>
            <option id="1" ><text>Personal</text></option>
        </select>
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
  groupinput: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
 
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
