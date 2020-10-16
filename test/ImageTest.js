import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import * as Speech from 'expo-speech';
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const firebaseConfig = {
  apiKey: "AIzaSyAlmL5SCGZDlu0pieccj_YsxSulPlHTVtg",
  authDomain: "sem-assignment.firebaseapp.com",
  databaseURL: "https://sem-assignment.firebaseio.com",
  projectId: "sem-assignment",
  storageBucket: "sem-assignment.appspot.com",
  messagingSenderId: "223151166275",
  appId: "1:223151166275:web:44879f05fab298831f95f6"
};

export default class ImageTest extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: 'YOYOYOYOYOYOYOYOYOYOYOYO'
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onChooseImagePress = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync(); allows you to select images from phone

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
      .then(()=>{
        Alert.alert("Success")
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
      return (
        <View style={styles.container}>
          <Button title="Choose Image" onPress={this.onChooseImagePress}/>
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
});
