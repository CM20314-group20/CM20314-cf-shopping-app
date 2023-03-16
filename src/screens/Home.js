import React, { useState } from 'react';
// import { SearchBar } from '@rneui/themed';
import { StyleSheet, View, Text, TextInput, Dimensions, Button } from 'react-native';
import { LineChart } from "react-native-chart-kit";
// import { SearchBar } from 'react-native-elements';

export default function Home() {
  return (
    <>
      {/* <View style={style.searchBar}>
        <TextInput placeholder='Search here' />
      </View> */}
      <View style={styles.container}>
        <Text style={styles.header01} >History</Text>
        <LineChart
          data={{
            labels: ["December", "January", "February", "March", "April", "May"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "red",
            backgroundGradientTo: "green",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "black"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            // borderRadius: 16
            borderRadius: 30
          }}
        />
        <Text style={styles.results} >1.6 miles of CO2 reduced</Text>
        <Text style={styles.results} >1kw energy saved</Text>
        <Text style={styles.results} >37 fishs saved</Text>
        <Text style={styles.results} >10 trees planeted</Text>
        <Text style={styles.header01} > Achievements </Text>
        <Text style={styles.Achievements} >Star Reducer:</Text>
        <Text>CF lowered by more than 50 kg from previous month</Text>
        <View style={styles.goal}>
          <Button
            title="GOALS"
            color="darkgreen"
            height="30"
            // fontSize="30px"
            onPress={() => alert('To save 10kg')} />
        </View>
        {/* <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        /> */}
      </View >
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
  results: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'black',
    elevation: 8,
    marginVertical: 8
  },
  header01: {
    fontSize: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // alignContent: 'left', // Doesn't work on android
    paddingVertical: 1,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    textDecorationLine: "underline",

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
    // alignItems: 'left',
    paddingVertical: 1,
    paddingHorizontal: 18,
    // backgroundColor: 'darkgreen',
    borderRadius: 4,
    elevation: 3,
    elevation: 8,
    marginVertical: 10
  }

});
