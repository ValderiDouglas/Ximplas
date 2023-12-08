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
  deleteDoc,
} from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";

export function RUDevento({ navigation, route }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [nome, setNome] = useState("");
  const [image, setImage] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState(null);
  const [dados, setDados] = useState(null);
  const [idevento, setIdevento] = useState(null);
  console.log(route.params?.id);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setId(user.uid);
      } else {
        setId(null);
      }
    });
    setIdevento(route.params?.id);
  }, []);

  // useEffect(() => {
  //   const getDados = async () => {
  //     try {
  //       const db = getFirestore();
  //       const collectionRef = collection(db, "event", id, "evento", idevento); // Corrigido para obter uma referência à coleção "event"
  //       const querySnapshot = await getDocs(collectionRef);

  //       setDados(querySnapshot.docs[0].data());
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getDados();
  // }, [id]);

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

      try {
        // Primeiro, faz o upload da imagem
        const docRef = await addDoc(collection(db, `event/${id}/evento`), {
          nome: nome,
          endereco: endereco,
          startDate: startDate,
          endDate: endDate,
          descricao: descricao,
          fk_user: user.uid,
        });

        // Obtém o ID do documento recém-criado
        const newItemId = docRef.id;

        // Faz o upload da imagem para o Storage
        await uploadToFirebase(newItemId);

        // Obtém o URL da imagem no Storage
        const storage = getStorage(FIREBASE_APP);
        const storageRef = ref(storage, `images/${newItemId}`);
        const imageUrl = await getDownloadURL(storageRef);

        // Atualiza o documento com o URL da imagem
        await setDoc(doc(db, `event/${id}/evento`, newItemId), {
          nome: nome,
          endereco: endereco,
          startDate: startDate,
          endDate: endDate,
          descricao: descricao,
          fk_user: user.uid,
          imageUrl: imageUrl, // Adiciona o URL da imagem ao documento
        });

        // Adiciona o evento à coleção "eventos"
        await addDoc(collection(db, `eventos`), {
          nome: nome,
          endereco: endereco,
          startDate: startDate,
          endDate: endDate,
          descricao: descricao,
          fk_user: user.uid,
          imageUrl: imageUrl, // Adiciona o URL da imagem à coleção "eventos"
        });

        Alert.alert("Sucesso", "Evento adicionado com sucesso");
        navigation.navigate("Eventos");
      } catch (e) {
        console.error("Erro ao adicionar o evento", e);
        Alert.alert("Erro", "Erro ao adicionar evento");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  const handlePhotoTaken = (photoUri) => {
    setImage(photoUri);
  };

  const deletarEvento = async () => {
    try {
      const db = getFirestore();
      const user = FIREBASE_AUTH.currentUser;
      console.log(id, idevento);
      // const eventoRef = doc(db, `event/${id}/evento`, idevento);
      const eventoRef = doc(db, `eventos`, idevento);
      // Obtém o URL da imagem no Storage
      // const storage = getStorage(FIREBASE_APP);
      // const storageRef = ref(storage, `images/${idevento}`);
      // const imageUrl = await getDownloadURL(storageRef);

      // if (imageUrl) {
      //   // Exclui o documento do Firestore
      await deleteDoc(eventoRef);
      //   // Exclui a imagem do Storage
      //   const imageRef = ref(storage, `images/${idevento}`);
      //   await deleteObject(imageRef);

      //   // Remove o evento da coleção "eventos"
      //   const eventosRef = collection(db, "eventos");
      //   const querySnapshot = await getDocs(eventosRef);
      //   const eventoToRemove = querySnapshot.docs.find(
      //     (doc) => doc.data().imageUrl === imageUrl
      //   );
      //   if (eventoToRemove) {
      //     await deleteDoc(doc(db, "eventos", eventoToRemove.id));
      //   }

      Alert.alert("Sucesso", "Evento deletado com sucesso");
      navigation.navigate("Eventos");
      // } else {
      //   Alert.alert("Erro", "URL da imagem não encontrado");
      // }
    } catch (error) {
      console.error("Erro ao deletar o evento", error);
      Alert.alert("Erro", "Erro ao deletar evento");
    }
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
        <TouchableOpacity onPress={deletarEvento} style={styles.button3}>
          <Text style={styles.buttontext}>DELETAR</Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
}
