import React, {useState, useEffect} from 'react';
import firebase from '../constants/firebase';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';

const MainNav = () => {
  const [user, setUser] = useState<any>(null);

  const bootstrap = () => {
    firebase.auth().onAuthStateChanged(_user => {
      if(_user) setUser(_user);
      else setUser(null);
    });
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <NavigationContainer>
      { user != null ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  )
}

export default MainNav;