import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

console.log( MapView );

class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      latitude: 41.0391683,
      longitude: 28.9982707,
      latitudeDelta: 1.2,
      longitudeDelta: 1.2
    }
  }
  render(){
    return(
        <View style={styles.mainView}>
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
                <Marker
                    coordinate={{
                      latitude: 41.0391683,
                      longitude: 28.9972707,
                    }}
                    name={"deneme_name"}
                    title={"deneme_title"}  
                    description={"deneme_aciklama"}   
                    onPress={this._markerOnpress}>
                </Marker>
 

          </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{flex:1}
});

export default App;