import "reflect-metadata";

import { Alert , View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
import { dataSource } from './src/database/index';
import { EventoEntity } from "./src/database/entities/EventoEntity";

export default function App() {
  const [nome, setNome] = useState('');
  const [quantity, setQuantity]= useState('');
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [eventos, setEventos] = useState<EventoEntity[]>([]);

  async function loadevento(){
    const productRepository = dataSource.getRepository(EventoEntity)
    const eventos= await productRepository.find();
    setEventos(eventos);
  }

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

  useEffect(() => {
    const connect= async()=>{
      if ( !dataSource.isInitialized){
        await dataSource.initialize();
        loadevento()
      }
    }
    connect();
  }, [])

  async function hadleAdd(){
    if(!nome.trim() || !quantity.trim()){
      Alert.alert("Informe o produto e a quantidade!");
    }
    const evento = new EventoEntity();
    evento.nome = nome;
    evento.quantity= Number(quantity);

    await dataSource.manager.save(evento);
    Alert.alert(`Evento cadastrado. ID: ${evento.id}`);
   }

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

