import React, { useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { styles } from "./styles";
const data = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  // Adicione mais itens 10
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" },
  { id: "8", text: "Item 8" },
  { id: "9", text: "Item 9" },
  { id: "10", text: "Item 10" },
];

const ItemList = ({ item }) => (
  <View style={styles.lista}>
    <View style={styles.foto}>
    </View>
    <View style={styles.box}>
      <Text style={styles.data}>teste</Text>
      <Text style={styles.titulo}>{item.text}</Text>
      <Text style={styles.local}>teste</Text>
    </View>
  </View>
);

export function Favoritos() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemList item={item} />}
      />
    </View>
  );
}