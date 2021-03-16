import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from 'native-base';


class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = {}
  }
  render(){
    return(
        <View>
            <Text>
              Ana Sayfa
            </Text>
        </View>
    );
  }
}

export default App;