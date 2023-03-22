import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Pressable } from 'react-native';
import ListFoodItem from '../components/ListFoodItem';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.js';

import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { currentIP } from '../components/GetIP.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShoppingList() {
  const [list, setList] = useState("");
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const ip = currentIP();
  const port = "4000";

  useEffect(() => {
    getData();
  }, [])
  
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@shopping-list', JSON.stringify({"list-items" : value}))
    } catch (e) {
      // saving error
      console.log('Store');
      console.log(e);
    }
  }

  const getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@shopping-list')
      const items = JSON.parse(value)["list-items"];
      setListItems(items);
      if (items != null) {
        setListItems(items);
      } else {
        storeData([]);
        // console.log('hello')
      }
      setLoading(false);
      
    } catch(e) {
      // error reading value
      console.log('read');
      console.log(e);
    }
    
  }

  const addItem = () => {
    Keyboard.dismiss();
    setListItems([...listItems, list])
    storeData([...listItems, list]);
    setList(null);
  }

  const removeItem = (index) => {
    let itemsCopy = [...listItems];
    itemsCopy.splice(index, 1);
    storeData(itemsCopy);
    setListItems(itemsCopy);
  }

  const removeAllItems = () => {
    setListItems([]);
    storeData([]);
  }

  async function calculateCF(props) {
    console.log(listItems);
    setLoading(true);
    try {
      axios.post('http://' + ip + ':' + port + '/shoppinglist', {
      data: {'calculate_cf' : props}
    }).then((response) => {
      setLoading(false);
      navigation.push("Receipt Items", {
        data: response.data["Shopping List Items"]
      });
    })
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <>
    
    {(loading) && <LoadingScreen />}
    {!loading && ( 
    <>
    
      <Pressable style={styles.removeAllItemsButton} onPress={() => {
        removeAllItems();
      }}>
        <Text style={styles.removeText}>Remove All Items</Text>
      </Pressable>

    <View style={styles.container}>
    
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      <View style={styles.tasks}>
        <View style={styles.items}>{
            listItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => removeItem(index)}>
                  <ListFoodItem text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      

      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.createTask}
      >
        <TextInput style={styles.input} placeholder={'Add item'} placeholderTextColor={'white'} value={list} onChangeText={text => setList(text)} />
        <TouchableOpacity onPress={() => addItem()}>
          <View style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
    
    </>
    )}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  removeAllItemsWrapper: {
    flex: 0,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeAllItemsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(49, 44, 44)',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  tasks: {
    paddingTop: 0,
    paddingHorizontal: 20,
    // backgroundColor: '', Warning comes here
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  items: {
    marginTop: 30,
  },
  createTask: {
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(49, 44, 44)',
    borderRadius: 60,
    borderWidth: 1,
    width: 250,
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgb(49, 44, 44)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  addText: {
    color: '#fff',
    fontSize: 20,
  },
  removeText: {
    color: '#fff',
  }
});