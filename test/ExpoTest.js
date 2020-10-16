import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Speech from 'expo-speech';

export default class ExpoTest extends Component {

  state = {
    text_speak: "Practice your reading skill and improve your English, learn new vocabulary and broaden your general knowledge via our specifically chosen interesting topics below."
  }

  //multiple languages, chinese is zh-cmn. Supports multiple voices. Can pause, resume, stop etc...

  onSpeak = () => {
    Speech.speak(this.state.text_speak, {
      language: 'en',
      pitch: 1,
      rate: 1,
      voice: 'com.apple.ttsbundle.Daniel-compact'

    })
  }
  onPause = () => {
    Speech.pause()
  }

  onResume = () => {
    Speech.resume()
  }

  onStop = () => {
    Speech.stop()
  }

  render () {
      return (
        <View style={styles.container}>
          <View style={{paddingTop: 100}}>
            <Button
            title="Speak"
            onPress={this.onSpeak}
            />
            <Button
            title="Pause"
            onPress={this.onPause}
            />
            <Button
            title="Resume"
            onPress={this.onResume}
            />
            <Button
            title="Stop"
            onPress={this.onStop}
            />
            
          </View>
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
