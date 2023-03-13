import React, { useState, useEffect } from 'react';
// import { SearchBar } from '@rneui/themed';
import { StyleSheet, View, Text, Dimensions, Pressable, Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from "axios";

export default function Home() {
  const [cfData, setcfData] = useState([])
  const ip = "192.168.1.94";
  const port = "4000";

  useEffect(() => {
    // getCFHistory()
  }, [])

  async function getCFHistory() {
    try {
      // const url = 'http://127.0.0.1:5000/';
      const url = 'http://' + ip + ':' + port + '/';
      const response = await axios.get(url);
      // FIXME
      const data = response.data["Data"];
      setcfData(data);
    }
    catch(err) {
      console.log(err);
    }
  }
  // const [update, setUpdate] = useState("")
  const Item = ({ item }) => {
    return <View style={styles.item}>{item.icon}</View>;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header_text}>
          <Text style={styles.header01}>Dashboard</Text>
        </View>
        <LineChart
          data={{
            labels: ["October", "November", "December", "January", "February", "March"],
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
            backgroundGradientFrom: "rgb(222, 245, 230)",
            backgroundGradientTo: "rgb(222, 245, 230)",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 2) => 'green',
            labelColor: (opacity = 2) => 'grey',
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "green"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            // borderRadius: 16
            borderRadius: 30
          }}
        />
        <View style={styles.savings}>
          <Text style={styles.c02}> 1.6 miles of CO2 reduced</Text>
          <Text style={styles.energy}> 1kw energy saved</Text>
          <Text style={styles.fish}> 37 fish saved</Text>
          <Text style={styles.trees}> 10 trees planted</Text>
          <Text style={styles.header01}> Achievements </Text>
        </View>
          <View style={styles.achievements}> 
            <Text style={styles.Achievements}> Star Reducer:</Text>
            <Text>CF lowered by more than 50 kg from previous month</Text>
          </View>
        <View style={styles.goalButtonWrapper} >
          <Pressable style={styles.goal} onPress={() => {
              Alert.alert(
                "To save 10kg"
              )
            }}>
              <Text style={styles.text}>Goals</Text>
            </Pressable>
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
  header_text: {
    alignItems: 'left'
  },
  savings: {
    alignItems: 'center'
  },
  achievements_wrapper: {
    alignItems: 'left'
  },
  achievements: {
    alignItems: 'center'
  },
  goalButtonWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100
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
  c02: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'green',
    elevation: 8,
    marginVertical: 8
  },
  energy: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: '#E9DB11',
    elevation: 8,
    marginVertical: 8
  },
  fish: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'blue',
    elevation: 8,
    marginVertical: 8
  },
  trees: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'green',
    // shadowColor: 'darkgrey',
    color: 'green',
    elevation: 8,
    marginVertical: 8
  },
  header01: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // alignContent: 'left', // Doesn't work on android
    paddingVertical: 1,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 8,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lawngreen',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400
  },
  item: {
    flex: 1,
    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff"
  }
});
