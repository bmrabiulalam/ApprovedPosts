import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, PendingPost } from '../components';
import firebase from '../constants/firebase';

const Dashboard = (props: any) => {
  const [posts, setPosts] = useState<any>([]);

  const fetchPendingPosts = async () => {
    firebase.firestore().collection('postsForApprovedPostApp').where('approved', '==', false).onSnapshot(querySnapshot => {
      setPosts(querySnapshot.docs);
    });
  }

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const onApprove = async (id: string) => {
    const post = await firebase.firestore().collection('postsForApprovedPostApp').doc(id).get();
    post.ref.set({approved: true}, {merge: true});
  }

  const onReject = async (id: string) => {
    await firebase.firestore().collection('postsForApprovedPostApp').doc(id).delete();
  }

  return (
    <View style={styles.container}>
      <Button text='Back' onPress={() => props.navigation.goBack()}/>
      <Text>Dashboard Screen</Text>
      <View style={{height: '80%', marginVertical: 30}}>
        {
          posts.length > 0 ? <FlatList data={posts} renderItem={({item}) => <PendingPost msg={item.data().msg} timeStamp={item.data().timeStamp} approved={item.data().approved} onReject={() => onReject(item.id)} onApproved={() => onApprove(item.id)} />} /> : <Text>No post pending.</Text>
        }
      </View>
    </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})