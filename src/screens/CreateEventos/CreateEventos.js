import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_APP,
} from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  doc,
} from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";

export function CreateEvento({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [nome, setNome] = useState("");
  const [image, setImage] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setId(user.uid);
      } else {
        setId(null);
      }
    });
  }, []);

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
    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadToFirebase = async (id) => {
    const storage = getStorage(FIREBASE_APP);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };

        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      // const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `images/${id}`);

      await uploadBytes(storageRef, blob);
      Alert.alert("Sucesso", "Imagem enviada com sucesso");
      navigation.navigate("Eventos");
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Erro ao enviar imagem");
    }
  };

  const adicionarEvento = async () => {
    if (
      nome !== "" &&
      endereco !== "" &&
      descricao !== "" &&
      image !== "" &&
      startDate !== "" &&
      endDate !== ""
    ) {
      const db = getFirestore();
      const user = FIREBASE_AUTH.currentUser;
      const data = {
        fk_user: user.uid,
        nome: nome,
        endereco: endereco,
        startDate: endDate,
        endDate: startDate,
        descricao: descricao,
      };

      try {
        const docRef = await addDoc(collection(db, `event/${id}/evento` ), data);
        await addDoc(collection(db, `eventos` ), data);
        const newItemId = docRef.id;
        uploadToFirebase(newItemId);
      } catch (e) {
        console.error("Erro ao adicionar o item", e);
      }
    } else {
      alert("Preencha todos os campos");
    }
  };
  const handlePhotoTaken = (photoUri) => {
    setImage(photoUri);
  };

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
          onChangeText={(text) => setEndereco(text)}
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
          onChangeText={(text) => setDescricao(text)}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 350,
              height: 350,
              alignSelf: "center",
              paddingBottom: 0,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Foto", { onPhotoTaken: handlePhotoTaken })
          }
          style={styles.button2}
        >
          <Text style={styles.buttontext2}>Tirar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttontext}>Escolher imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={adicionarEvento} style={styles.button1}>
          <Text style={styles.buttontext}>SALVAR</Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
}
