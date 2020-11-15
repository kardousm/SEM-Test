import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableHighlight} from 'react-native';
import * as Speech from 'expo-speech';
import AudioSlider from './AudioSlider';
import styles from './Styles';
import { Fontisto } from '@expo/vector-icons';
import * as firebase from 'firebase';




const firebaseConfig = {
  apiKey: "AIzaSyAlmL5SCGZDlu0pieccj_YsxSulPlHTVtg",
  authDomain: "sem-assignment.firebaseapp.com",
  databaseURL: "https://sem-assignment.firebaseio.com",
  projectId: "sem-assignment",
  storageBucket: "sem-assignment.appspot.com",
  messagingSenderId: "223151166275",
  appId: "1:223151166275:web:44879f05fab298831f95f6"
};



export default class PlayAudio extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uri: ""
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  
  componentDidMount() {
    console.log('ran')
    this.getImage()
  }

  getImage = () => {
    var storage = firebase.storage()

    storage.ref().child('images/test-image').getDownloadURL()
      .then((url)=> {
        this.setState({uri: url})

      })
  }


  render () {
    console.log("Accessing PlayAudio")
    
    const AudioFile = require("./output.mp3")


    return (
      <View style={[styles.StandardContainer, {
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 100,
        marginBottom: 5,
    }]}>

      <Image source={{uri: this.state.uri}} style={{ width: '100%', height: '70%', marginBottom:40}} /> 
      <AudioSlider audio={AudioFile}/>

      <TouchableHighlight onPress={()=>this.props.navigation.push("Choices")}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <Fontisto name="camera" size={24} color="black"/>
          <Text style={{marginTop: 10, color: 'black'}}>Take another picture</Text>
        </View>
      </TouchableHighlight>
      
     </View>


  );
}
}








