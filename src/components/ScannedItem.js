import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Row } from 'react-native-table-component';
import CarIcon from '../components/CarIcon';
  
const ScannedItem = (props) => {
  let data = props["data"];

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
      return '#00FF00'
    }
    else if (carbonFootprintVal < rating2) {
      return '#7ac40a'
      return '#9ACD32'
    }
    else if (carbonFootprintVal < rating3) {
      return '#a8a222'
      return '#FFA500'
    }
    else if (carbonFootprintVal < rating4) {
      return '#ffa700'
      return '#FF6347'
    }
    else {
      return '#ff0000'
    }
  }

  function carbonGramsToCarDistance(grams) {
    // Reference https://www.statista.com/statistics/1233337/carbon-footprint-of-travel-per-kilometer-by-mode-of-transport-uk/
    return (grams/170).toFixed(2)
  }


  return (
    <>
    {/* <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Product Name</DataTable.Title>
        <DataTable.Title>Category</DataTable.Title>
        <DataTable.Title>C02 per kg</DataTable.Title>
      </DataTable.Header>
      {data.map((data, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell> {data["product_name"]} </DataTable.Cell>
          <DataTable.Cell> {data["category"]} </DataTable.Cell>
          <DataTable.Cell> <Text style = { [getStyle(data["co2_total_per_kg"]), styles.text] }> {data["co2_total_per_kg"]} </Text> </DataTable.Cell>
        </DataTable.Row>
      ))}
      </DataTable> */}
      <ScrollView>
        <View style={styles.tableContainer}>
        {data.map((data, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.productNameBox}>
              <Text style={styles.productName} >{data["product_name"]}</Text>
            </View>
            <View style={styles.carbonDetailsContainer}>
              <CarIcon color={getStyle(data["co2_total_per_kg"])} size={50}/>
              <View style={styles.carbonDetailsBox}>
                <Text style={[styles.equalToDrivingText, {color: getStyle(data["co2_total_per_kg"])}]}>Equal to driving {carbonGramsToCarDistance(data["co2_total_per_kg"])} in a petrol car</Text>
                <Text>{data["co2_total_per_kg"]}g CO2 per 1Kg of Product</Text>
              </View>
            </View>
          </View>
        ))}
        </View>
      </ScrollView>
    </>
  );
};
  
export default ScannedItem;
  
const styles = StyleSheet.create({
  tableContainer: {
    // marginLeft:'5%',
    flexDirection:'column',
    width:'100%',
  },

  itemContainer: {
    width:'100%',
    // height: 80,
    flexDirection:'column',
    color:'red',
    padding:15,
  },
  productNameBox: {
    // paddingLeft: 10,
    height: 25,
  },
  productName: {
    // height: 20,
    // color: 'green',
    // color: 'red',
    fontWeight: 'bold',
    fontSize:18
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