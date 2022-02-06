import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

import mapStyle from './mapStyle.json';

const Pulse = require('react-native-pulse').default;

const {height, width} = Dimensions.get('window');

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null)
  const [techs, setTechs] = useState('');
  const [warning, setWarning] = useState('False');

  useEffect(() => {
      async function loadInitialPosition() {

      const { granted } = await Location.requestForegroundPermissionsAsync();
 
      if (granted) {
        const { coords } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs
    );
  }

  async function loadDevs() {
    Keyboard.dismiss();
    
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(response.data.devs);
    setupWebSocket();
    setWarning(!warning)
  }

  function handleRegionChanged(region) {
    // console.log(region);
    setCurrentRegion(region);
  }

  if(!currentRegion) {
    return null;
  }

    let search = `Search... ${warning}`

    // console.log("rerender")
    
    return (
         <View style={ styles.container }>
	    <MapView
                onRegionChangeComplete={handleRegionChanged}
                onPress={() => Keyboard.dismiss()}
	        initialRegion={currentRegion}
	        style={styles.map}
	        customMapStyle={mapStyle}
            >
        {devs.map(dev => (
          <Marker
          key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],              
            }}
          >
            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} /> 
              {           <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
              </Callout> }
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
          <TextInput
              style={styles.searchInput} 
              placeholder={search}
              placeholderTextColor="#999"
              autoCapitalize="words"
              autoCorrect={false}
              value={techs}
              onChangeText={setTechs}
          />

          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF" />
          </TouchableOpacity>
      </View>
            {warning && 
             <View style={styles.pulse}>
                 <Pulse color='red' numPulses={3} diameter={500} speed={10} duration={2000} />
             </View> }
            {warning && 
             <View style={styles.info}>
                 <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>You are close </Text>
                 <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>to the interactive </Text>
                 <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>point</Text>
             </View> }
            {!warning && 
             <View style={styles.pulse}>
                 <Pulse color='white' numPulses={3} diameter={500} speed={10} duration={2000} />
             </View> }
         </View>             
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',        
    },
    
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
  
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },

  callout: {
    width: 260,
    marginLeft: 5,
    marginTop: 5
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },
  
  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  pulse: {
      alignItems: 'center',
      justifyContent: 'center',
      top: height/2+80,
      zIndex: 0,
  },
    
  info: {
      top: -160,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
  },
    
});

export default Main;