import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Add from './add';
import Edit from './edit';
import Home from './home';
import Views from './view';

export default function App() {
  const Stack= createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
<Stack.Screen name='home' component={Home}></Stack.Screen>
<Stack.Screen 
options={{
  headerShown:false
}}
name='add' component={Add}></Stack.Screen>
<Stack.Screen 
options={{
  headerShown:true
}}name='view' component={Views}></Stack.Screen>
<Stack.Screen
options={{
  headerShown:false
}} name='edit' component={Edit}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
