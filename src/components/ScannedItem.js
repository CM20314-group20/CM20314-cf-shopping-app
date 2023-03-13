import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const ScannedItem = (props) => {
  let data = props["data"];
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
          <DataTable.Cell> {data["co2_total_per_kg"]} </DataTable.Cell>
        </DataTable.Row>
      ))}
      </DataTable>
    </>
  );
};
  
export default ScannedItem;
  
const styles = StyleSheet.create({
  text: {
    color: 'green',
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