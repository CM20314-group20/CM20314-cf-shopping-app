import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function CameraButton({title, onPress, icon, color}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
    <Entypo name={icon} size={28} color={color ? color: '#f1f1f1'}/>
    <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:50,
        marginLeft:50,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: 10,
    }
})