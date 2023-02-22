import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import LeaderboardTable from '../components/LeaderboardTable.js';
import axios from 'axios';

export default function Social() {
  const [update, setUpdate] = useState("")
  const Separator = () => <View style={styles.separator} />;
  async function callSocial() {
    try {
      const url = 'http://127.0.0.1:5000/';
      const response = await axios.get(url);
      return response.data;
    }
    catch(err) {
      console.log(err);
    }
  }
  async function leaveGroup() {
    try {
      await axios.post('http://127.0.0.1:5000/social', {
        data: 'Left group',
      })
    }
    catch(err) {
      console.log(err);
    }
  }
  function getLeaderboard() {
    // TODO - create a get request to fetch leaderboard table from backend
    let rows = [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]
    console.log(rows);
    return rows;
  }
  async function getLeaderboard2() {
    // TODO - create a get request to fetch leaderboard table from backend
    let rows = [];
    try {
      const url = 'http://127.0.0.1:5000/social';
      const response = await axios.get(url);
      rows = response.data['id-list'];
    }
    catch(err) {
      console.log(err);
    }

    return rows;
  }
  
  
  return (
    <>
    <View style={styles.groupidbuttons}>
      <Pressable style={styles.groupid}>
        <Text style={styles.text}>Group ID : placeholder</Text>
      </Pressable>
    </View>

    <View>
      <LeaderboardTable style={styles.leaderboard} data={getLeaderboard()}/>
    </View>

    <View style={styles.groupbuttons}>

      <Pressable style={styles.leavegroup}>
        <Text style={styles.text} onPress={() => leaveGroup()}>Leave Group</Text>
      </Pressable>
      
      <Separator />

      <Pressable style={styles.joingroup}>
        {/* <Text style={styles.text} onPress={() => Alert.alert("Join Group")}>Join Group</Text> */}
        <Text style={styles.text} onPress={() => callSocial().then(data => console.log(data))}>Join Group</Text>
      </Pressable>

      <Separator />

      <Pressable style={styles.creategroup}>
        <Text style={styles.text} onPress={() => Alert.alert("Create Group")}>Create Group</Text>
      </Pressable>

      <Separator />

    </View>    

    </>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    flex: 1,
    alignItems: 'center',
  },
  groupbuttons: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
    paddingHorizontal: 20,
  },
  groupidbuttons: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'top',
    justifyContent: 'top' ,
    padding: 20,
  },
  leavegroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  joingroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  creategroup: {
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
  groupid: {
    alignItems: 'left',
    justifyContent: 'left',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#B7C1CC',
    shadowColor: 'darkgrey',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});