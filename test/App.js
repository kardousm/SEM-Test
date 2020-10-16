import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Speech from 'expo-speech';
import ExpoTest from './ExpoTest'
import ImageTest from './ImageTest'
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/storage";

/*
const firebaseConfig = {
  apiKey: "AIzaSyAlmL5SCGZDlu0pieccj_YsxSulPlHTVtg",
  authDomain: "sem-assignment.firebaseapp.com",
  databaseURL: "https://sem-assignment.firebaseio.com",
  projectId: "sem-assignment",
  storageBucket: "sem-assignment.appspot.com",
  messagingSenderId: "223151166275",
  appId: "1:223151166275:web:44879f05fab298831f95f6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: 'YOYOYOYOYOYOYOYOYOYOYOYO'
    }
  }

  componentDidMount() {
    var that = this

    firebase.database().ref('/value').on('value', (snapshot) => {
      let temp = snapshot.val()
      console.log(temp.text)
    })
  }

  render () {

    //firebase.database().ref('/value').set({'text':""})

    return (
      <View style={styles.container}>
        <Text>Hi</Text>
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

export default App;
*/


class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <ImageTest/>
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

export default App;


