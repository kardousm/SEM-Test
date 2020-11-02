import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import * as Speech from 'expo-speech';
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import PlayAudio from './PlayAudio'
import {useNavigation} from '@react-navigation/native';




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

export default class ImageTest extends Component {

  constructor(props) {
    super(props)

    this.state = {
      number: 0,
      images: 0
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {
    console.log("State + Images")
    console.log(this.state.number)
    console.log(this.state.images)
    var that = this
    let temp = 0
  
    firebase.database().ref('/value').on('value', (snapshot) => {
      if (temp==0) {
        console.log('entered temp')
        console.log(this.state.number)
        temp = 1
      }
      else {
        if (snapshot.val().text > 0) {
          console.log('entered snapshot')
          this.setState({number: this.state.number + 1})
          console.log(this.state.number)
        }

      }
      //let temp = snapshot.val()
    })
  }


  onChooseImagePress = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync(); allows you to select images from phone

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
      .then(()=>{
        firebase.database().ref('/images').set({'number': result.uri})
        this.setState({images: this.state.images + 1})
        console.log("Image State")
        console.log(this.state.images)
        Alert.alert("The Audio File Is Currently Being Generated. Proceed When Button Turns Green.")
        console.log("Success")
      })
      .catch((error)=> {
        Alert.alert(error);
      })
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);

    return ref.put(blob);
  }



  render () {
    let button;
    if (this.state.number == 0) {
      button =   
        <TouchableOpacity style={styles.appButtonContainerFalse}>
          <Text style={styles.appButtonText}>Next</Text>
        </TouchableOpacity>
    }
    else {
      button =   
      <TouchableOpacity onPress={()=>this.props.navigation.push("PlayAudio")} style={styles.appButtonContainerTrue}>
        <Text style={styles.appButtonText}>Next</Text>
      </TouchableOpacity>

    }
      return (
        <View style={styles.container}>
          <Button title="Choose Image" onPress={this.onChooseImagePress}/>
          {button}
        </View>
    );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainerFalse: {
    marginTop: 20,
    elevation: 8,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonContainerTrue: {
    marginTop: 20,
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
