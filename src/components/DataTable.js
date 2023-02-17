import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const LeaderboardTable = () => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Position</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Footprint</DataTable.Title>
        <DataTable.Title>Badges</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell>1</DataTable.Cell>
        <DataTable.Cell>Joma</DataTable.Cell>
        <DataTable.Cell>23kg</DataTable.Cell>
        <DataTable.Cell>-</DataTable.Cell>
      </DataTable.Row>
  
      <DataTable.Row>
        <DataTable.Cell>2</DataTable.Cell>
        <DataTable.Cell>Coffeezilla</DataTable.Cell>
        <DataTable.Cell>25kg</DataTable.Cell>
        <DataTable.Cell>-</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>3</DataTable.Cell>
        <DataTable.Cell>Ben Awad</DataTable.Cell>
        <DataTable.Cell>27kg</DataTable.Cell>
        <DataTable.Cell>-</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
  
export default LeaderboardTable;
  
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    roundness: 5,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});