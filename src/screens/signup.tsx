import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from '../components';
import firebase from '../constants/firebase';

const SignUp = (props) => {
  const [name, setName] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const signup = async () => {
    if(name && email && password){
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if(user) {
          await firebase
                  .firestore()
                  .collection('usersForApprovedPostApp')
                  .doc(user.uid)
                  .set({name, email, password});
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert("Missing Fields");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Input placeholder='Name' onChangeText={(text: string) => setName(text)} />
      <Input placeholder='Email' onChangeText={(text: string) => setEmail(text)} />
      <Input placeholder='Password' secureTextEntry onChangeText={(text: string) => setPassword(text)} />
      <Button text="Sign Up" onPress={signup}/>
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('login')} style={{marginHorizontal: 5}}>
          <Text style={{color: 'rgba(81, 135, 200, 1)'}}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    flexDirection: "row",
    marginVertical: 20
  }
})