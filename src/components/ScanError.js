import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ScanError(args) {
  console.log(args["route"]);
  let error_msg = "";
  if (args["route"]["params"] == undefined){
    error_msg = "Barcode Information Cannot be Retrieved"
  } else {
    error_msg = args["route"]["params"]["data"] + ", Please Try Again";
  }
  const [update, setUpdate] = useState("")
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.errorText}>{error_msg}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    flex: 0.2,
    alignItems: 'center',
    // paddingHorizontal: 30,
    fontSize: 20,
  }
});
