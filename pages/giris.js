import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';


class App extends Component {
  constructor( props ){
    super( props );
    this.state = {
      url:"http://lamerdiary.com/services/service.php?",
      kullanici_adi:"",
      parola:"",
      hash:""
    }
  }

  goToPage=(pageName, data)=>{
    const stackAction = StackActions.push(pageName, data);
    this.props.navigation.dispatch( stackAction );
  }

  girisYap=()=>{
    if ( this.state.kullanici_adi.length > 0 && this.state.parola.length > 0 ){
      axios.get(this.state.url+"komut=hash&kullanici_adi="+this.state.kullanici_adi+"&parola="+this.state.parola).then(res=>{ 
        if ( res && res.data && res.data.status == 1 && res.data.hash ){
          hash = res.data.hash;
          this.setState( {hash: hash} );
          AsyncStorage.setItem("hash", hash).then();
          AsyncStorage.setItem("kullanici_adi", this.state.kullanici_adi).then();
          AsyncStorage.setItem("parola", this.state.parola).then();
          this.goToPage("Anasayfa", {});
        }
        else{
          alert("Kullanıcı adı ya da parolanız yanlış !");
        }
      })
    }
    else{
      alert("Kullanıcı ya da parola bilgilerini girmediniz !");
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("kullanici_adi").then(kullanici_adi=>{
      this.setState( {kullanici_adi:kullanici_adi} );
    });
    AsyncStorage.getItem("parola").then(parola=>{
      this.setState( {parola:parola} );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input value={this.state.kullanici_adi} placeholder="Kullanıcı Adı" onChangeText={ text => { this.setState({kullanici_adi: text}) } } />
            </Item>
            <Item last>
              <Input value={this.state.parola} placeholder="Parola" onChangeText={text => { this.setState({parola:text}) }}/>
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