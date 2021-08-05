import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from '../components';
import firebase from '../constants/firebase';

const Login = (props) => {
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const signIn = async () => {
    if(email && password) {
      const {user} =  await firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password);
    } else {
      Alert.alert("Missing Fields");
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Input placeholder='Email' onChangeText={(text: string) => setEmail(text)} />
      <Input placeholder='Password' secureTextEntry onChangeText={(text: string) => setPassword(text)} />
      <Button text="Login" onPress={signIn}/>
      <View style={styles.signupText}>
        <Text style={{marginHorizontal: 5}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('signup')} style={{marginHorizontal: 5}}>
          <Text style={{color: 'rgba(81, 135, 200, 1)'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signupText: {
    flexDirection: "row",
    marginVertical: 20
  }
})