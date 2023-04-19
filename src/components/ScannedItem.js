import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Row } from 'react-native-table-component';
import CarIcon from '../components/CarIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
  
const ScannedItem = (props) => {
  let data = props["data"];
  const [loading, setLoading] = useState(false);
  const [cfData, setcfData] = useState([]);
  const [carbonVal, setTotalCarbon] = useState(-1);

  useEffect(() => {
    getCFHistory();
    console.log(data);
    setTotalCarbon(totalCarbon(data));
    if (carbonVal == -1) {
      setLoading(true);
    } else {
      storeData(carbonVal);
      setLoading(false);
    }
  }, [carbonVal])
  
  const storeData = async (value) => {
    try {
      // TODO - only stores the previous shop cf data, not every single shop
      // Handle if passing empty shopping list / receipt
      if (value == "NaN") {
        value = 0
      }
      data = ["1.23", "2.34", "3.45", value]
      await AsyncStorage.setItem('@prev-cf-val', JSON.stringify({"prev-data" : data}));
    } catch (e) {
      // saving error
      console.log('Store');
      console.log(e);
    }
  }
    
  
  async function getCFHistory() {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@prev-cf-val')
      let prev_data = JSON.parse(value)["prev-data"];
      let prev_data_arr = [JSON.parse(value)["prev-data"]];
      // console.log(prev_data_arr);
      setcfData([prev_data]);
      setLoading(false);
    } catch(e) {
      // error reading value
      console.log('read');
      console.log(e);
    }
  }
  
  function getStyle(carbonFootprint) {
    // console.log(carbonFootprint);
    // let carbonFootprintVal = carbonFootprint.slice(0, length-2)
    let carbonFootprintVal = +carbonFootprint

    let rating1 = 1;
    let rating2 = 2;
    let rating3 = 3;
    let rating4 = 4;
    //  rating5 > 4

    if (carbonFootprintVal < rating1) {
      return '#2cba00'
      // return '#00FF00'
    }
    else if (carbonFootprintVal < rating2) {
      return '#7ac40a'
      // return '#9ACD32'
    }
    else if (carbonFootprintVal < rating3) {
      return '#a8a222'
      // return '#FFA500'
    }
    else if (carbonFootprintVal < rating4) {
      return '#ffa700'
      // return '#FF6347'
    }
    else {
      return '#ff0000'
    }
  }

  function carbonGramsToCarDistance(grams) {
    // Reference https://www.statista.com/statistics/1233337/carbon-footprint-of-travel-per-kilometer-by-mode-of-transport-uk/
    return (grams/170).toFixed(2)
  }

  function totalCarbon(data){
    // ATTENTION This number is very flawed because
    // say if someone bough 5kg worth of environmentally friendly milk (10g per 1kg) and 5grams of beef jerkey (500g per 1kg)
    // the total would be 255 g per kg
    let sum = 0;
    data.forEach(function(item, index) {
      sum += item["co2_total_per_kg"];
    })

    return (sum/data.length).toFixed(2);
  }

  return (
    <>
    {loading && <LoadingScreen />}
    
    {!loading && (
      <>
      <ScrollView>
        <View style={styles.titleBox}>
          <Text style={styles.todaysFootprint}>Todays Footprint: </Text>
          <Text style={[styles.todaysFootprint, {color: getStyle(carbonVal)}]}>{carbonVal}</Text>
          <Text> per kg</Text>
        </View>
        <View style={styles.tableContainer}>
        {data.map((data, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.productNameBox}>
              <Text style={styles.productName} >{data["product_name"]}</Text>
            </View>
            <View style={styles.carbonDetailsContainer}>
              <CarIcon color={getStyle(data["co2_total_per_kg"])} size={50}/>
              <View style={styles.carbonDetailsBox}>
                <Text style={[styles.equalToDrivingText, {color: getStyle(data["co2_total_per_kg"])}]}>Equal to driving {carbonGramsToCarDistance(data["co2_total_per_kg"])}km in a petrol car</Text>
                <Text>{data["co2_total_per_kg"]}g CO<Text style={{fontSize: 10}}>2</Text> per 1Kg of Product</Text>
              </View>
            </View>
          </View>
        ))}
        </View>
        </ScrollView>
        </>
        )}
        </>
  );
};
  
export default ScannedItem;
  
const styles = StyleSheet.create({
  titleBox: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
  },
  todaysFootprint: {
    fontSize: 26,
    fontWeight:'bold',
  },
  tarbonTitle: {
    fontSize: 20,
  },
  tableContainer: {
    flexDirection:'column',
    width:'100%',
  },

  itemContainer: {
    width:'100%',
    flexDirection:'column',
    padding:15,
    paddingTop:5,
    paddingBottom: 25,
    borderBottomWidth:1,
    borderBottomColor: '#D3D3D3'
  },
  productNameBox: {
    height: 25,
  },
  productName: {
    fontWeight: 'bold',
    fontSize:18,
    // color: '#606060'
  },
  carbonDetailsContainer: {
    height:30,
    flexDirection:'row',
  },
  carbonDetailsBox: {
    width: '100%',
    paddingLeft: 10,
    // paddingTop: 5,
  },
  equalToDrivingText: {
    fontSize: 16,
  },
  highcf: {
    // color: 'red',
  },
  container: {
    // padding: 15,
    // backgroundColor: '#fff',
    // roundness: 5,
  },
  tableHeader: {
    // backgroundColor: '#DCDCDC',
  },
});