import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Input, Button, Post } from '../components';
import firebase from '../constants/firebase';

const Home = (props: any) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);

  const signOut = () => {
    firebase.auth().signOut()
  }
  
  const fetchPosts = async () => {
    firebase.firestore().collection('postsForApprovedPostApp').where('approved', '==', true).onSnapshot(querySnapshot => {
      setPosts(querySnapshot.docs);
    });
  }

  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser?.uid;
    const _user = await firebase.firestore().collection("usersForApprovedPostApp").doc(uid).get();
    setUser({id: _user.id, ..._user.data()});
  }

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, [])

  const post = async () => {
    if(msg) {
      const data = {
        msg,
        timeStamp: Date.now(),
        approved: false
      };
      
      try {
        await firebase.firestore().collection('postsForApprovedPostApp').add(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Missing Fields');
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button text="Sign Out" onPress={signOut}/>
      <View>
        <Input 
          placeholder='Write something...'
          onChangeText={(text: string) => setMsg(text)} 
        />
        <Button text="Post" onPress={post}/>
      </View>
        { 
          user?.isAdmin ? (
              <View>
                <Button text='Dashboard' onPress={() => props.navigation.navigate('dashboard')}/>
              </View>
            ) : null 
        }
        <View style={{flex: 1, marginTop: 5}}>
          <Text style={{marginVertical: 15, fontSize: 16, fontWeight: 500, alignSelf: 'center'}}>See Posts</Text>
          {
            posts.length > 0 ? <FlatList data={posts} renderItem={({item}) => <Post msg={item.data().msg} timeStamp={item.data().timeStamp} approved={item.data().approved} />} /> : <View><Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>No post to display</Text></View>
          }
        </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})