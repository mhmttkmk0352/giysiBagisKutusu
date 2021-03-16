import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Container, Content } from 'native-base';

class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = {}
  }
  render(){
    return(
        <View>
            <Text>
              Giriş Sayfa
            </Text>
        </View>
    );
  }
}

export default App;