import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//Page Start
import Giris from './pages/giris';
import Anasayfa from './pages/anasayfa';
//Page End

class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Giris"}>
          <Stack.Screen name="Giris" component={Giris} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Anasayfa" component={Anasayfa} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;