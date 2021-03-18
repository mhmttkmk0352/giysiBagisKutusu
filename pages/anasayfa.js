import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Toast } from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      url:"http://lamerdiary.com/services/service.php?",
      latitude: 41.0391683,
      longitude: 28.9982707,
      latitudeDelta: 1.2,
      longitudeDelta: 1.2,
      positions:[]
    }
  }

  getPositions=async()=>{
    let url = this.state.url+"komut=liste";
    axios.get( url ).then( res => {
      this.setState( {positions: res.data.data} );
    });
  }

  getPosition=( yaz=false )=>{
    Geolocation.getCurrentPosition( position => {
      console.log( (position.coords) );
      this.setState( {latitude: position.coords.latitude} );
      this.setState( {longitude: position.coords.longitude} );
      if ( yaz == true ){
        let url = this.state.url+"komut=ekle&hash=f90415ed3e3546a23241f5d3ec417e18&latitude="+position.coords.latitude+"&longitude="+position.coords.longitude;
        console.log( {url} );
        axios.get( url ).then( res => {
          console.log( res.data );
          if ( res.data.status == 1 ){
            this.getPositions();
            alert( res.data.message );
          }
        });
      }
    });
  }

  openGps = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then( data => {
      if ( data  ){
        this.getPosition();
      }
      else{
        this.openGps();
      }
    }).catch(err=>{
      this.openGps();
    });
  }

  componentDidMount(){
    this.openGps();
    this.getPositions();
  }

  render(){
    return(
        <View style={styles.mainView}>
          <View style={{flex:90}}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                zoomEnabled={true}
                style={{flex:1}}
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: this.state.latitudeDelta,
                  longitudeDelta: this.state.longitudeDelta      
                }}
                region={{
                  latitude: this.state.latitude ,
                  longitude: this.state.longitude,
                  latitudeDelta: this.state.latitudeDelta,
                  longitudeDelta: this.state.longitudeDelta     
                }}

                onRegionChange={this._onRegionChange}>
                 {
                   this.state.positions && this.state.positions.map((v,k) => (
                    <Marker
                      key={v.id}
                        coordinate={{
                          latitude: parseFloat( v.latitude ),
                          longitude: parseFloat( v.longitude ),
                        }}
                        name={"deneme_name"}
                        title={"deneme_title"}  
                        description={"deneme_aciklama"}   
                        onPress={this._markerOnpress} />
                   ))
                 }
            </MapView>
          </View>
          <View style={styles.buttonView}>
            <Button warning style={styles.Button} onPress={ ()=>{this.getPosition( true )} }>
              <Text style={styles.ButtonText}>Kutu Ekle</Text>
            </Button>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{flex:1},
  buttonView:{
    flex:10, justifyContent:"center", alignItems:"center"
  },
  Button:{
    width:'100%',
    justifyContent:'center'
  },
  ButtonText:{
    color:"white"
  }
});

export default App;