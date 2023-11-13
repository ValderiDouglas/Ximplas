import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
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
        const collectionRef = collection(db, "event", id, "evento"); // Corrigido para obter uma referência à coleção "event"
        const querySnapshot = await getDocs(collectionRef);

        const dadosArray = [];

        querySnapshot.forEach((docSnap) => {
          if (docSnap.exists()) {
            // Adiciona os dados de cada documento a um array
            dadosArray.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });

        // Define os dados no estado ou realiza outra ação conforme necessário
        setDados(dadosArray);
        // const timestampInMillis =
        //   dadosArray[1].startDate
        // console.log(timestampInMillis);

      } catch (error) {
        console.error(error);
      }
    };

    getDados();
  }, [id]); // Remova [id] se você quiser buscar os documentos uma vez na montagem do componente

  console.log(dados);

  // "nanoseconds": 302000000,
  //   "seconds": 1699832806,
  const ItemList = ({ item }) => (
    <View style={styles.lista}>
      <View style={styles.foto}></View>
      <View style={styles.box}>
        <Text style={styles.data}>date</Text>
        <Text style={styles.titulo}>{item.nome}</Text>
        <Text style={styles.local}>{item.endereco}</Text>
      </View>
    </View>
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
