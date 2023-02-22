import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const LeaderboardTable = (rows) => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Position</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Footprint</DataTable.Title>
        <DataTable.Title>Badges</DataTable.Title>
      </DataTable.Header>

      {rows.data.map((row, index) => (
        // TODO - fix error of each child in list having unique "key"
        <DataTable.Row>
          <DataTable.Cell key={row['0']}>{row['0']}</DataTable.Cell>
          <DataTable.Cell key={row['1']}>{row['1']}</DataTable.Cell>
          <DataTable.Cell key={row['2']}>{row['2']}</DataTable.Cell>
          <DataTable.Cell key={index}>{row['3']}</DataTable.Cell>
        </DataTable.Row>
      ))}
      
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