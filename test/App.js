import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import * as Speech from 'expo-speech';
import ExpoTest from './ExpoTest'
import ImageTest from './ImageTest'
import AudioTest from './AudioTest'
import * as firebase from 'firebase';
import "firebase/database";
import "firebase/storage";
import styles from './Styles';
import AudioSlider from './AudioSlider';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayAudio from './PlayAudio';
import Choices from './Choices'



LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
        <RootStack.Screen name="Choices" component={Choices} options={{headerShown: false}}/>
        <RootStack.Screen name="ImageTest" component={ImageTest} options={{headerShown: false}}/>
        <RootStack.Screen name="PlayAudio" component={PlayAudio} options={{headerShown: false}}/>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




/*
class App extends Component {

  render () {
    return (
    <View style={styles1.container}>
      <ImageTest/>
    </View>
  );
}
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
*/


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



class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: 'YOYOYOYOYOYOYOYOYOYOYOYO'
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
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












