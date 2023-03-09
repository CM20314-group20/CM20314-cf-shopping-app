import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const LeaderboardTable = (rows) => {
  const cfBadge1 = '../images/cf-badge-1.png';

  function determineBadge(val) {
    if (val == "None") {
      return <Image style={styles.badge1} source={require(cfBadge1)} />
    } else {
      return "None"
    }
  }

  function getStyle(carbonFootprint) {
    let length = carbonFootprint.length;
    let carbonFootprintVal = carbonFootprint.slice(0, length-2)
    if (carbonFootprintVal < 25) {
      return {color: '#63f542'}
    }
    else if (carbonFootprintVal < 35) {
      return {color: '#a7f542'}
    }
    else if (carbonFootprintVal < 50) {
      return {color: '#f5844s'}
    }
    else {
      return {color: '#f54242'}
    }
  }
  return (
    <>
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Position</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Footprint</DataTable.Title>
        <DataTable.Title>Badges</DataTable.Title>
      </DataTable.Header>

      {rows.data.map(row => (
        <DataTable.Row key={row['0']}>
          <DataTable.Cell> {row['0']} </DataTable.Cell>
          <DataTable.Cell> {row['1']} </DataTable.Cell>
          <DataTable.Cell> <Text style={getStyle(row['2'])}> {row['2']} </Text> </DataTable.Cell>
          <DataTable.Cell> {determineBadge(row['3'])} </DataTable.Cell>
        </DataTable.Row>
      ))}
      
    </DataTable>
    </>
  );
};
  
export default LeaderboardTable;
  
const styles = StyleSheet.create({
  lowcf: {
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
  badge1: {
    height: 40,
    width: 40,
    backgroundColor: '#fff'
  }
});