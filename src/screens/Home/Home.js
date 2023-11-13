import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import { styles, evento } from "./styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const Item = ({ item }) => (
  <View style={evento.lista}>
    <View style={evento.foto}></View>
    <View style={evento.boxtexto}>
      <Text style={evento.data}>teste</Text>
      <Text style={evento.titulo}>{item.nome}</Text>
      <Text style={evento.local}>{item.endereco}</Text>
    </View>
  </View>
);

function Flat({ data }) {
  return (
    <FlatList
      style={styles.lista}
      data={data}
      horizontal={true}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <Item item={item} />}
    />
  );
}

export function Home() {
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
          if (docSnap.exists()) {
            // Adiciona os dados de cada documento a um array
            dadosArray.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });

        // Define os dados no estado ou realiza outra ação conforme necessário
        setDados(dadosArray);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    getDados();
  }, [id]);
  return (
    <ScrollView style={styles.container}>
      <Flat data={dados} />
    </ScrollView>
  );
}
