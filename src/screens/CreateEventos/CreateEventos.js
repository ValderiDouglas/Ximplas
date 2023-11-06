import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

export function CreateEvento({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [image, setImage] = useState(null);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDatePicker(false);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    if (currentDate >= startDate) {
      setEndDate(currentDate);
      setShowEndDatePicker(false);
    } else {
      Alert.alert("Erro", "A data de fim deve ser maior que a data de início");
    }
  };

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // const adicionarEvento = () => {
  //   const userRef = doc(collection(db, "event"), user.uid);
  //   setDoc(userRef, { id: user.uid, nome: nome, email: email });
  //   console.log("Adicionando evento");
  // };
  console.log(route.params.photoUrl[0])
  return (
    <ScrollView style={styles.container}>
      <>
        <Text>Nome do evento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do evento"
          onChangeText={(text) => setNome(text)}
        />
        <Text>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Data de Inicio:</Text>
        <TextInput
          style={styles.input}
          value={startDate.toDateString()}
          placeholder="Data Inicio"
          onFocus={() => setShowStartDatePicker(true)}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}
        <Text>Data de Fim:</Text>
        <TextInput
          style={styles.input}
          value={endDate.toDateString()}
          placeholder="Data Fim"
          onFocus={() => setShowEndDatePicker(true)}
        />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}
        <Text>Descrição:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          onChangeText={(text) => setEmail(text)}
        />
        {image && (
          <Image
            source={{ uri: route.params.photoUrl[0] }}
            style={{
              width: 300,
              height: 300,
              alignSelf: "center",
              paddingBottom: 20,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("Foto")}
          style={styles.button2}
        >
          <Text style={styles.buttontext2}>Tirar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttontext}>Escolher imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={""} style={styles.button1}>
          <Text style={styles.buttontext}>SALVAR</Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
}
