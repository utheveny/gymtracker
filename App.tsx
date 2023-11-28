import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTrainingScreen from './screens/MyTraining/MyTrainingScreen';
import MyDatasScreen from './screens/MyDatas/MyDatasScreen';
import TrainingTimeScreen from './screens/TrainingTime/TrainingTimeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Mon programme" component={MyTrainingScreen} />
          <Tab.Screen name="Training Time" component={TrainingTimeScreen} />
          <Tab.Screen name="Mes données" component={MyDatasScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}
