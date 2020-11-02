import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import * as Speech from 'expo-speech';
import AudioSlider from './AudioSlider';
import styles from './Styles';
import { Fontisto } from '@expo/vector-icons';




export default class PlayAudio extends Component {

  render () {
    const AudioFile = require("./output.mp3")
    return (
      <View style={[styles.StandardContainer, {
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 100,
        marginBottom: 5,
    }]}>

      <AudioSlider audio={AudioFile}/>

      <TouchableHighlight onPress={()=>this.props.navigation.push("ImageTest")}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <Fontisto name="camera" size={24} color="black"/>
          <Text style={{marginTop: 10, color: 'black'}}>Take another picture</Text>
        </View>
      </TouchableHighlight>
      
     </View>


  );
}
}








