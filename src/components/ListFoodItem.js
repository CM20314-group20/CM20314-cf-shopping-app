import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const ListFoodItem = (props) => {

  return (
    <View style={styles.item}>
      <View style={styles.alignItem}>
        <View style={styles.tickOffItem}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  )
}
export default ListFoodItem;

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#BDC3C7',
    backgroundColor: 'rgb(222, 245, 230)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  alignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tickOffItem: {
    width: 24,
    height: 24,
    backgroundColor: 'green',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    color: 'black',
  },
});
