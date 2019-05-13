import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import OnboardingLoadingScreen from '../screens/OnboardingLoadingScreen'
import OnboardingScreen from '../screens/OnboardingScreen';

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    App: MainTabNavigator,
    OnboardingLoading: OnboardingLoadingScreen,
    Onboarding: OnboardingScreen
  }, {
    initialRouteName: 'OnboardingLoading'
  }
));