import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';

export default class OnboardingLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //await AsyncStorage.removeItem('userToken');
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Onboarding');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Image
          resizeMode='contain'
          source={require('../assets/images/splash.png')}
        />
      </View>
    );
  }
}