import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Picker, ScrollView, ImageBackground} from 'react-native';
import * as Speech from 'expo-speech';
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import PlayAudio from './PlayAudio'
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RNPickerSelect from 'react-native-picker-select';




const firebaseConfig = {
  apiKey: "AIzaSyAlmL5SCGZDlu0pieccj_YsxSulPlHTVtg",
  authDomain: "sem-assignment.firebaseapp.com",
  databaseURL: "https://sem-assignment.firebaseio.com",
  projectId: "sem-assignment",
  storageBucket: "sem-assignment.appspot.com",
  messagingSenderId: "223151166275",
  appId: "1:223151166275:web:44879f05fab298831f95f6"
};

var options =  { 
  apikey: 'e680ab78ba88957',
  language: 'eng', // Português
  imageFormat: 'jpg', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
  isOverlayRequired: true
};

export default class Choices extends Component {

  constructor(props) {
    super(props)

    this.state = {
      language: "english",
      speed: "normal",
      voice: "male"

    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

  }

  nextButton = () => {
    firebase.database().ref('/choices').set({'language': this.state.language, 'speed': this.state.speed, 'voice': this.state.voice})
    this.props.navigation.push("ImageTest")

  }
  
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./cool-background.png')} style={styles.backgroundImage}>
          <Text style={{fontSize: 16}}>Text Language:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a language',
                value: null,
                
                }}
              style={{...pickerSelectStyles}}
              onValueChange={(value) => this.setState({language: value})}
              items={[
                  { label: '中文', value: 'mandarin' },
                  { label: 'English', value: 'english' },
                  { label: 'Française', value: 'french' }
              ]}
          />
          <Text style={{fontSize: 16, marginTop:20}}>Speed:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a speed',
                value: null,
                
                }}
              style={{...pickerSelectStyles}}
              onValueChange={(value) => this.setState({speed: value})}
              items={[
                  { label: 'Fast', value: 'fast' },
                  { label: 'Normal', value: 'normal' },
                  { label: 'Slow', value: 'slow' }
              ]}
          />
          <Text style={{fontSize: 16, marginTop:20}}>Voice:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a voice',
                value: null,
                
                }}
              style={{...pickerSelectStyles}}
              onValueChange={(value) => this.setState({voice: value})}
              items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
              ]}
          />
          <Button style={{color: 'red'}} title='Next' onPress={this.nextButton}/>
        </ImageBackground>
      </View>

      )

    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    width: 100,
  },
  pickeritems: {
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  backgroundImage: {
    flex: 1, 
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center'
  }

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      marginLeft: 80,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1.2,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
      fontWeight: '300',
      width: '60%'

  },
});
