import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { TaskDetails } from './components/TaskDetails';
import { Profile } from './components/Profile';
import { HabitTracker } from './components/HabitTracker';
import { TaskScheduler } from './components/TaskScheduler';

const Stack = createNativeStackNavigator();

export function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="HabitTracker" component={HabitTracker} />
        <Stack.Screen name="TaskScheduler" component={TaskScheduler} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}