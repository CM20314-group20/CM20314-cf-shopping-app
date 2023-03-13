import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Pressable } from 'react-native';
import ListFoodItem from '../components/ListFoodItem';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.js';

import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ShoppingList() {
  const [list, setList] = useState();
  const [listItems, setListItems] = useState();
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const ip = "192.168.1.94";
  const port = "4000";

  useEffect(() => {
    getShoppingListItems()
  }, [])
  
  // FIXME - Load Scanned Items page as a stack not a tab
  function renderScannedItems() {
    navigation.navigate("Scanned Items");
  }

  async function getShoppingListItems() {
    try {
      // const url = 'http://127.0.0.1:5000/shoppinglist';
      const url = 'http://' + ip + ':' + port + '/shoppinglist';
      const response = await axios.get(url);
      const shoppingListItems = response.data["Items"];      
      setListItems(shoppingListItems);
    }
    catch(err) {
      console.log(err);
    }
  }

  const addItem = () => {
    Keyboard.dismiss();
    setListItems([...listItems, list])

    // axios.post('http://127.0.0.1:5000/shoppinglist', {
    axios.post('http://' + ip + ':' + port + '/shoppinglist', {
      data: {'items_after_add' : [...listItems, list]}
    })
    .catch(function (error) {
      console.log(error);
    });
    setList(null);
    // renderScannedItems();
  }

  const removeItem = (index) => {
    let itemsCopy = [...listItems];
    itemsCopy.splice(index, 1);
    // axios.post('http://127.0.0.1:5000/shoppinglist', {
    axios.post('http://' + ip + ':' + port + '/shoppinglist', {
      data: {'items_after_remove' : itemsCopy}
    })
    .catch(function (error) {
      console.log(error);
    });

    setListItems(itemsCopy)
  }

  const removeAllItems = () => {
    setListItems([]);
  }

  return (
    <>
    
    {(!listItems) && <LoadingScreen />}
    {listItems && ( 
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