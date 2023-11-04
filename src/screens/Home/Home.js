import React, { useState } from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import { styles, evento } from "./styles";

const data = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" },
  { id: "8", text: "Item 8" },
  { id: "9", text: "Item 9" },
  { id: "10", text: "Item 10" },
];

const ItemList = ({ item }) => (
  <View style={evento.lista}>
    <View style={evento.foto}></View>
    <View style={evento.boxtexto}>
      <Text style={evento.data}>teste</Text>
      <Text style={evento.titulo}>{item.text}</Text>
      <Text style={evento.local}>teste</Text>
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
      renderItem={({ item }) => <ItemList item={item} />}
    />
  );
}

export function Home() {
  return (
    <ScrollView style={styles.container}>
      <Flat data={data} />
      <Flat data={data} />
      <Flat data={data} />
      <Flat data={data} />
      <Flat data={data} />
    </ScrollView>
  );
}
