import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';
import {
  watchPositionAsync,
  requestBackgroundPermissionsAsync,
  LocationObject,
  getCurrentPositionAsync,
  LocationAccuracy
} from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  async function requestLocationPermissions() {
    const { granted } = await requestBackgroundPermissionsAsync();
    if (granted) {
      const curruntPosition = await getCurrentPositionAsync();
      setLocation(curruntPosition);
    }
  }
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  function HandleRegionChange(region: any) {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        center: response.coords,
      });
    })
  }
  return (
    <View style={styles.container}>

      {location &&
      <>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
        <TouchableOpacity
          style={styles.botao}
          onPress={HandleRegionChange}
          >
          <Icon name="refresh" size={30} color="white" />
          </TouchableOpacity>
        </>
      }

    </View>
  );
}

