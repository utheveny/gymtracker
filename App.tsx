import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTrainingScreen from './MyTrainingScreen';
import MyDatasScreen from './MyDatasScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Mon programme" component={MyTrainingScreen} />
        <Tab.Screen name="Mes données" component={MyDatasScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
