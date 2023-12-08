import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { styles, evento } from "./styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export function Home({ navigation , route }) {
  const [id, setId] = useState(null);
  const [dados1, setDados] = useState(null);
  const [dados2, setDados2] = useState(null);

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Abrir", { id: item.eventId })}>
    <View style={evento.lista}>
      <View style={evento.foto}>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={evento.foto1} // Ajuste o estilo conforme necessário
          />
        )}
      </View>
      <View style={evento.boxtexto}>
        <Text style={evento.data}>teste</Text>
        <Text style={evento.titulo}>{item.nome}</Text>
        <Text style={evento.local}>{item.endereco}</Text>
      </View>
    </View>
    </TouchableOpacity>
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

  useEffect(() => {
    const getDados = async () => {
      try {
        const db = getFirestore();
        const collectionRef = collection(db, "eventos");
        const querySnapshot = await getDocs(collectionRef);

        const dadosArray = [];
        const dadosArray2 = [];

        querySnapshot.forEach((docSnap) => {
          if (docSnap.exists()) {
            dadosArray.push(docSnap.data());
            dadosArray2.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });
        dadosArray.sort((a, b) => (a.curtidas?.length || 0) - (b.curtidas?.length || 0));
        // Define os dados no estado ou realiza outra ação conforme necessário
        setDados(dadosArray);
        setDados2(dadosArray2);
        
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setId(user.uid);  
      } else {
        setId(null);
      }
    });
    getDados();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={evento.titulo}> Eventos mais populares:</Text>
      <Flat data={dados1} />
      <Text style={evento.titulo}> Eventos mais recentes:</Text>
      <Flat data={dados2} />    
  </ScrollView>
  );
}
