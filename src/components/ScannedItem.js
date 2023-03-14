import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
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
      return '#ff0000'
    }
    else if (carbonFootprintVal < rating2) {
      return '#ffa700'
    }
    else if (carbonFootprintVal < rating3) {
      return '#fff400'
    }
    else if (carbonFootprintVal < rating4) {
      return '#a3ff00'
    }
    else {
      return '#2cba00'
    }
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
      <View style={styles.tableContainer}>
      {data.map((data, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.textBox}>
            <Text style={styles.productName} >{data["product_name"]}</Text>
          </View>
          <View style={styles.carbonDetailsContainer}>
            <CarIcon color={getStyle(data["co2_total_per_kg"])} size={50}/>
            <View style={styles.carbonDetailsBox}>
              <Text>Equal to driving 0.4km in a petrol car</Text>
              <Text>95g CO2 per 100g of Product</Text>
            </View>
          </View>
        </View>
      ))}
      </View>
    </>
  );
};
  
export default ScannedItem;
  
const styles = StyleSheet.create({
  tableContainer: {
    marginLeft:'5%',
    flexDirection:'column',
    width:'95%',
  },

  itemContainer: {
    width:'100%',
    height: 80,
    flexDirection:'column',
    color:'red',
  },
  carbonDetailsContainer: {
    height:30,
    flexDirection:'row',
  },
  carbonDetailsBox: {
    // flexDirection:'row',
    // width:'100%'
  },
  textBox: {
    // paddingLeft: 10,
    height: 20,
  },
  productName: {
    height: 20,
    // color: 'green',
    // color: 'red',
    fontWeight: 'bold',
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