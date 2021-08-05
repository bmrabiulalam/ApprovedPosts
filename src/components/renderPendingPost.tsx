import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from '.';

const {width, height} = Dimensions.get('screen');

interface Props {
    msg: string;
    approved: string;
    timeStamp: number;
    onApproved: () => void;
    onReject: () => void;
}

const formatTime = (timeStamp: number) => {
    const calculatedTime = Date.now() - timeStamp;
    if(((((calculatedTime / 1000) / 60) / 60) / 24) > 60) return `${(((calculatedTime / 1000) / 60) / 60).toFixed(0)} hr`;
    if((calculatedTime / 1000 / 60) > 60) return `${(((calculatedTime / 1000) / 60) / 60).toFixed(0)} hr`;
    if((calculatedTime / 1000) > 60) return `${((calculatedTime / 1000) / 60).toFixed(0)} min`;
    if(calculatedTime > 1000) return `${(calculatedTime / 1000).toFixed(0)} s`;
    // else return `${((((calculatedTime / 1000) / 60) / 60) / 24).toFixed(0)} d`;
}

const PendingPost = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{width: '80%'}}>{props.msg}</Text>
        <Text>{formatTime(props.timeStamp)}</Text>
      </View>
      <View>
          <Button text='Approve' onPress={props.onApproved}/>
          <Button text='Reject' onPress={props.onReject}/>
      </View>
    </View>
  )
}

export default PendingPost;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset: {
        width: 3,
        height: 3
    },
    shadowColor: '#ccc',
    shadowOpacity: 0.9
  }
})