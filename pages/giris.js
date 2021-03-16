import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import axios from 'axios';

class App extends Component {
  constructor( props ){
    super( props );
    this.state = {
      hash:""
    }
  }

  girisYap=()=>{
    alert(5);
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Kullanıcı Adı" />
            </Item>
            <Item last>
              <Input placeholder="Parola" />
            </Item>
            <Button onPress={ ()=>{this.girisYap()} } style={styles.Button}>
              <Text>Giriş Yap</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Button:{
    width:'100%',
    justifyContent:'center'
  }
});

export default  App;