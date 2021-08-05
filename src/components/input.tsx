import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean
}

const Input = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry || false}
      />
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    marginVertical: 10
  },
  input: {
    padding: 15
  }
})