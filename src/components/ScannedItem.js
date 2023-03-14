import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import CarIcon from '../components/CarIcon';
  
const ScannedItem = (props) => {
  let data = props["data"];

  function getStyle(carbonFootprint) {
    console.log(carbonFootprint);
    // let carbonFootprintVal = carbonFootprint.slice(0, length-2)
    let carbonFootprintVal = +carbonFootprint

    let rating1 = 1;
    let rating2 = 2;
    let rating3 = 3;
    let rating4 = 4;
    //  rating5 > 4

    if (carbonFootprintVal < rating1) {
      return {color: '#ff0000'}
    }
    else if (carbonFootprintVal < rating2) {
      return {color: '#ffa700'}
    }
    else if (carbonFootprintVal < rating3) {
      return {color: '#fff400'}
    }
    else if (carbonFootprintVal < rating4) {
      return {color: '#a3ff00'}
    }
    else {
      return {color: '#2cba00'}
    }
  }


  return (
    <>
    <DataTable style={styles.container}>
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
      </DataTable>
      <View>
        <CarIcon color={'#2cba00'}/>
      </View>
    </>
  );
};
  
export default ScannedItem;
  
const styles = StyleSheet.create({
  text: {
    // color: 'green',
    fontWeight: 'bold',
  },
  highcf: {
    color: 'red',
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
    roundness: 5,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});