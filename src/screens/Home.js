import React, { useState, useEffect } from 'react';
// import { SearchBar } from '@rneui/themed';
import { StyleSheet, View, Text, Dimensions, Pressable, Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from "axios";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Social from './Social';
import Settings from './Settings';
import ShoppingList from './ShoppingList';
import ReceiptScanner from './ReceiptScanner';
import ReceiptItems from './ReceiptItems';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import publicIP from 'react-native-public-ip';
import LoadingScreen from '../components/LoadingScreen';
import { currentIP } from '../components/GetIP.js';

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const Separator = () => <View style={styles.separator} />;
  const [cfData, setcfData] = useState([-1]);
  const [update, setUpdate] = useState("");

  const ip = currentIP();
  const port = "4000";

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const storeData = async (value) => {
    setEmail(value);
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
      console.log('Store');
      console.log(e);
    }
  }
  const setCfNull = async (value) => {
    try {
      await AsyncStorage.setItem('@prev-cf-val', JSON.stringify({"prev-data" : 0}))
    } catch (e) {
      // saving error
      console.log('Store');
      console.log(e);
    }
  }
  // setCfNull();
  const getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@storage-key')
      if (value != null) {
        setEmail(value);
      }
      else {
        storeData('uniqueid');
      }
      postID(email);
      setLoading(false);
      
    } catch(e) {
      // error reading value
      console.log('read');
      console.log(e);
    }
  }

  useEffect(() => {
    getCFHistory();
    // setCfNull();
    // getData();
  }, [])
  
  
  async function getCFHistory() {
    // try {
    //   const url = 'http://' + ip + ':' + port + '/';
    //   const response = await axios.get(url);
    //   const data = response.data['Data'];
    //   setcfData(data);
    // }
    // catch(err) {
    //   console.log(err);
    // }
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@prev-cf-val')
      if (value == null) {
        setcfData([0, 0]);
        setLoading(false);
        return;
      }
      let prev_data = JSON.parse(value)["prev-data"];
      let prev_data_arr = [JSON.parse(value)["prev-data"]];
      
      if (prev_data_arr.length <= 1) {
        setcfData([0, prev_data]);
      } else {
        setcfData(prev_data);
      }

      setLoading(false);
      
    } catch(e) {
      // error reading value
      console.log('read');
      console.log(e);
    }
  }

  async function postID(props) {
    try {
      axios.post('http://' + ip + ':' + port + '/', {
      uuid: props
    })
    }
    catch(err) {
      console.log(err);
    }
  }

  const Item = ({ item }) => {
    return <View style={styles.item}>{item.icon}</View>;
  };
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
      <>
      <View style={styles.container}>
        <View style={styles.header_text}>
          <Text style={styles.header01}>Dashboard</Text>
        </View>
        <LineChart
          data={{
            labels: ["October", "November", "December", "January", "February", "March"],
            datasets: [
              { data: cfData }
            ]
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "rgb(222, 245, 230)",
            backgroundGradientTo: "rgb(222, 245, 230)",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 2) => 'green',
            labelColor: (opacity = 2) => 'grey',
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "green"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            // borderRadius: 16
            borderRadius: 30
          }}
        />
        <View style={styles.savings}>
          <Text style={styles.c02}> 1.6 miles of CO2 reduced</Text>
          <Text style={styles.energy}> 1kw energy saved</Text>
          <Text style={styles.fish}> 37 fish saved</Text>
          <Text style={styles.trees}> 10 trees planted</Text>
          <Text style={styles.header01}> Achievements </Text>
        </View>
          <View style={styles.achievements}> 
            <Text style={styles.Achievements}> Star Reducer:</Text>
            <Text>CF lowered by more than 50 kg from previous month</Text>
          </View>

        <Separator />
        
        <View style={styles.goalButtonWrapper} >
          <Pressable style={styles.goal} onPress={() => {
              Alert.alert(
                "To save 10kg"
              )
            }}>
              <Text style={styles.text}>Goals</Text>
            </Pressable>
        </View>

      </View ></>)}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'top', // Doesn't work on android
  },
  header_text: {
    // alignItems: 'left' // Doesn't work on android
  },
  savings: {
    alignItems: 'center'
  },
  achievements_wrapper: {
    // alignItems: 'left' // Doesn't work on android
  },
  achievements: {
    alignItems: 'center'
  },
  goalButtonWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100
  },
  graph: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'lightgrey',
    // shadowOpacity: 1.5,
    // shadowRadius: 5,
    // shadowOffset: { width: 1, height: 5 },
    marginVertical: 8
  },
  c02: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'green',
    elevation: 8,
    marginVertical: 8
  },
  energy: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: '#E9DB11',
    elevation: 8,
    marginVertical: 8
  },
  fish: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'blue',
    elevation: 8,
    marginVertical: 8
  },
  trees: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'green',
    elevation: 8,
    marginVertical: 8
  },
  header01: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // alignContent: 'left', // Doesn't work on android
    paddingVertical: 1,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    marginVertical: 8
  },
  Achievements: {
    fontSize: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // alignContent: 'left', // Doesn't work on android
    color: 'orange',
    paddingVertical: 1,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    // textDecorationLine: "underline",

    marginVertical: 8
  },
  goal: {
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
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400
  },
  item: {
    flex: 1,
    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
