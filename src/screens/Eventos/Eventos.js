import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

export function Eventos({ navigation }) {
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
          if (docSnap.exists()&& docSnap.data().fk_user === id) {
            // Adiciona os dados de cada documento a um array
            console.log(docSnap.data());
            dadosArray.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });
        setDados(dadosArray);
        console.log(dados);
      } catch (error) {
        console.error(error);
      }
    };

    getDados();
  }, [id]);

  // console.log(dados);

  const ItemList = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Editar Evento", { id: item.eventId } )}>
    <View style={styles.lista}>
      <View style={styles.foto}>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.foto1}
          />
        )}
      </View>
      <View style={styles.box}>
        <Text style={styles.data}>date</Text>
        <Text style={styles.titulo}>{item.nome}</Text>
        <Text style={styles.local}>{item.endereco}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar"
        onPress={() => navigation.navigate("Criar Evento")}
      />
      <FlatList
        data={dados}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <ItemList item={item} />}
      />
    </View>
  );
}
