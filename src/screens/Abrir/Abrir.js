import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Share,
} from "react-native";
import { styles } from "./styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { getFirestore, collection, doc, getDocs, get, getDoc, updateDoc } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

export function Abrir({ navigation, route }) {
  const [id, setId] = useState(null);
  const [dados, setDados] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setId(user.uid);
      } else {
        setId(null);
      }
    });
  }, []);

  useEffect(() => {
    const getDados = async () => {
      try {
        const db = getFirestore();
        const collectionRef = collection(db, "eventos");
        const querySnapshot = await getDocs(collectionRef);

        const dadosArray = [];
        querySnapshot.forEach((docSnap) => {
          if (docSnap.exists() && docSnap.data().eventId === route.params.id) {
            dadosArray.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });
        setDados(dadosArray[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getDados();
  }, [id]);

  const handleCurtir = async (event) => {
    if (id) {
      try {
        const db = getFirestore();
        const docRef = doc(db, "eventos", event);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const docData = docSnap.data();
          const curtidasArray = docData && docData.curtidas ? docData.curtidas : [];
  
          if (curtidasArray.includes(id)) {
            // Si ya dio "like", quitar el "like"
            const index = curtidasArray.indexOf(id);
            curtidasArray.splice(index, 1);
          } else {
            // Si no ha dado "like", agregar el "like"
            curtidasArray.push(id);
          }
  
          // Actualizar la base de datos con el nuevo array de "likes"
          await updateDoc(docRef, { curtidas: curtidasArray });
          Alert.alert("Sucesso", "Favoritado com sucesso!");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigation.navigate("Login");
    }
  };
  

  const handleCompartilhar = async () => {
    try {
      const link = `https://seusite.com/eventos/${dados.eventId}`;
      await Share.share({
        title: "Compartilhar evento",
        message: `Confira este evento: ${dados.nome} - ${dados.descricao}\n\n${link}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {dados && (
        <View style={styles.lista}>
          <View style={styles.foto}>
            {dados.imageUrl && (
              <Image source={{ uri: dados.imageUrl }} style={styles.foto1} />
            )}
          </View>
          <View style={styles.box}>
            <Text style={styles.data}>
              Data inicio- Data fim: {dados.startDate.seconds}-
              {dados.endDate.seconds}
            </Text>
            <Text style={styles.titulo}>Nome evento: {dados.nome}</Text>
            <Text style={styles.local}>Endereço: {dados.endereco}</Text>
            <Text style={styles.local}>Descricao: {dados.descricao}</Text>
            <Text style={styles.local}>Criador: {dados.fk_user}</Text>
          </View>
          <View style={styles.botoesContainer}>
            <TouchableOpacity onPress={handleCurtir(dados.eventId)} style={styles.botao}>
              <Ionicons name="heart" size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCompartilhar} style={styles.botao}>
              <Ionicons name="send" size={50} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
