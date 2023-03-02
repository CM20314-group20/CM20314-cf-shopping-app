import React, { useState } from 'react';
// import { SearchBar } from '@rneui/themed';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function Home() {
  // const [update, setUpdate] = useState("")
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header01} >History</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
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
            backgroundColor: "red",
            backgroundGradientFrom: "red",
            backgroundGradientTo: "green",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "white"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text style={styles.results} >1.6 miles of CO2 reduced</Text>
        <Text style={styles.results} >1kw energy saved</Text>
        <Text style={styles.results} >37 fishs saved</Text>
        <Text style={styles.header01} > Achievements </Text>
        <Text style={styles.results} >Star Reducer:</Text>
        <Text>CF lowered by more than 50 kg from previous month</Text>
        <View style={styles.goal}>
          <Button
            title="GOALS"
            color="green"
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
    justifyContent: 'top',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'darkgreen',
    elevation: 8,
    marginVertical: 8
  },
  header01: {
    fontSize: '25px',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'left',
    paddingVertical: 1,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
    textDecorationLine: "underline",

    marginVertical: 8
  },
  goal: {
    alignItems: 'left',
    paddingVertical: 1,
    paddingHorizontal: 18,
    // backgroundColor: 'red',
    borderRadius: 4,
    elevation: 3,
    elevation: 8,
    marginVertical: 10
  }
});
