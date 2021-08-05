import React from 'react';
import { Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface Props {
  text: string;
  onPress: () => void;
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: "center",
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10
  },
  text: {
    color: '#fff'
  }
})