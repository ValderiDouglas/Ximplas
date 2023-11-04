import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import {
  watchPositionAsync,
  requestBackgroundPermissionsAsync,
  LocationObject,
  getCurrentPositionAsync,
  LocationAccuracy
} from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import MapView, { Marker , PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from "react-native-vector-icons/Ionicons";

export function Mapa() {
  const [location, setLocation] = useState(LocationObject);

  async function requestLocationPermissions() {
    const { granted } = await requestBackgroundPermissionsAsync();
    if (granted) {
      const curruntPosition = await getCurrentPositionAsync();
      setLocation(curruntPosition);
    }
  }
  const mapRef = useRef(MapView);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  function HandleRegionChange(region) {
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
          <MapView provider={PROVIDER_GOOGLE}
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
            <Ionicons name="locate-sharp" size={30} color="white" />
          </TouchableOpacity>
        </>
      }
    </View>
  );
}