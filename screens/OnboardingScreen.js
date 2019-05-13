
import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,          // Container component
  AsyncStorage, 
  Image,
  TextInput,
  DatePickerAndroid,
  Picker,
  Alert,
  Keyboard
} from 'react-native';
import { Icon, LinearGradient } from 'expo';

import Swiper from '../components/Swiper';

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      birthday: '',
      sex: '',
      initialStepGoal: ''
    }
  }

  handleStart = async () => {
    if (this.state.name === '' || this.state.birthday === '' || this.state.sex === '' || this.state.stepGoal === '' ) {
      const errorMessage = 'Please fill out all the fields.';

      Alert.alert(
        'Oops',
        errorMessage
      );
      return;
    }
    await this._saveUser()
    this.props.navigation.navigate('App')
  }

  _saveUser = async () => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(this.state))
    } catch(error) {
      alert(error)
    }
  }

  showPicker = async () => {
    Keyboard.dismiss()
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ date: new Date(), });
      if (action === DatePickerAndroid.dismissedAction) {
      } else {
        var birthday = [((month+1)<10)?"0"+(month+1):(month+1),(day<10)?"0"+day:day,year].join("/")
        this.setState({ birthday })
      }
    } catch (error) {
      alert(error)
    }
  };

  render() {
    return (
      <Swiper onStart={this.handleStart} onSubmit={this._saveUser}>
        {/* First screen */}
        <View style={styles.slide}>
          <Image style={{width:200,height:200,resizeMode: 'contain',alignContent: 'center',}} source={require("../assets/images/Sticker-Oblation-happy.png")} />
          <Text style={styles.header}>#WalkUP</Text>
          <Text style={styles.text}>Improve your lifestyle through walking.</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>PRIVACY POLICY</Text>
          <Text style={styles.subheader}>Information Collection and Use</Text>
          <Text style={styles.blockText}>{'\t\t\t\t'}The following information will be collected through the user's email for research purposes:</Text>
          <Text style={styles.blockText}>
            {'\u2022'}  User Profile {'\n'}
            {'\u2022'}  E-mail {'\n'}
            {'\u2022'}  Home screen time {'\n'}
            {'\u2022'}  Number of times success and failure messages show {'\n'}
            {'\u2022'}  User’s daily step activity and usage {'\n'}
          </Text>
          <Text style={styles.blockText}>{'\t\t\t\t'}If results of this study are published or presented, individual names and other personally identifiable information will not be used. Neither your name nor any other identifying information will be associated with the data collected. When the research is completed, we may save the data for use in future reasearch done by us or others within the area of the research field.</Text>
          <Text style={[styles.blockText, {marginTop: 5, fontFamily:'opensans-bold', textAlign:'center'}]}>Continue if you UNDERSTAND and AGREE.</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Image style={{width:300,height:300,resizeMode: 'contain',alignContent: 'center',}} source={require("../assets/images/Sunflower.gif")} />
          <Text style={styles.header}>Track your Steps</Text>
          <Text style={styles.text}>Reach your daily step goal and watch your streak increase and your sunflower grow!</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Image style={{width:300,height:300, marginBottom: -30, resizeMode: 'contain',alignContent: 'center',}} source={require("../assets/images/Badges.gif")} />
          <Text style={styles.header}>Earn Badges</Text>
          <Text style={styles.text}>Reaching your goals earns you badges! Earn as many as 70 Step Goal Badges and Streak Badges</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>
            Profile Setup
          </Text>
          <TextInput
              style={styles.inputField}
              placeholder="Name"
              placeholderTextColor={'#9F9F9F'}
              selectionColor={'black'}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Birthday (MM/DD/YYYY)"
              placeholderTextColor={'#9F9F9F'}
              selectionColor='black'
              onChangeText={birthday => this.setState({ birthday })}
              value={this.state.birthday}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              onFocus={this.showPicker}
            />
            <View style={{height: 40, width: 255, backgroundColor:'white', marginBottom:10, borderColor:'black',borderWidth: 1}}>
              <Picker
                prompt="Sex"
                mode="dropdown"
                selectedValue={this.state.sex}
                style={{ height: 35, width: 250 , backgroundColor:'white', marginBottom:10, borderColor:'black',borderWidth: 1}}
                onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
                <Picker.Item label="Sex" value="" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
            </View>
            <Text style={{fontSize:12,color:'black',marginBottom:5}}>On average, how many steps do you take everyday?</Text>
            <View style={{height: 40, width: 255, backgroundColor:'white', marginBottom:10, borderColor:'black',borderWidth: 1}}>
              <Picker
                prompt="Step Goal"
                selectedValue={this.state.initialstepGoal}
                style={{ height: 35, width: 250, backgroundColor:'white', marginBottom:10, borderColor:'black',borderRadius:5,borderWidth: 1}}
                onValueChange={(itemValue, itemIndex) => this.setState({initialstepGoal: itemValue})}>
                <Picker.Item label="-" value="" />
                <Picker.Item label="3000 steps" value="3000" />
                <Picker.Item label="4000 steps" value="4000" />
                <Picker.Item label="5000 steps" value="5000" />
                <Picker.Item label="6000 steps" value="6000" />
                <Picker.Item label="7000 steps" value="7000" />
                <Picker.Item label="8000 steps" value="8000" />
                <Picker.Item label="9000 steps" value="9000" />
                <Picker.Item label="10000 steps" value="10000" />
              </Picker>
            </View>
        </View>
      </Swiper>

    );
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
    backgroundColor: '#DAA520',
    padding: 15
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'opensans-extrabold',
    fontSize: 30,
    marginVertical: 15,
  },
  subheader: {
    color: '#FFFFFF',
    fontFamily: 'opensans-semibold',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: -10, 
    marginBottom: 10
  },
  blockText: {
    color: '#FFFFFF',
    fontFamily: 'opensans',
    fontSize: 12,
    marginHorizontal: 15,
    textAlign: 'left',
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'opensans',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: 255,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    fontSize: 12,
    color: 'black',
    backgroundColor:'white'
  },
});