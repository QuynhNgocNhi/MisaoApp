import React, {Component} from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

class Splash extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Intro');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#26BE8D" />
        <Animatable.View animation="fadeIn" easing="ease-out">
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/splash-icon.png')}
          />
        </Animatable.View>
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26BE8D',
  },
  image: {
    height: 110,
    width: 110,
  },
});
