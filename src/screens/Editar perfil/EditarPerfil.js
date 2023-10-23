import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { styles } from "./styles";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function EditarPerfil() {
  const [id, setId] = useState(null);
  const [dados, setDados] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        const uid = user.uid;
        setId(uid);
      } else {
        setId(null);
      }
    });
  }, []);

  useEffect(() => {
    const getDados = async () => {
      if (id != null) {
        const querySnapshot = await getDocs(
          collection(FIREBASE_DATABASE, "users")
        );
        querySnapshot.forEach((doc) => {
          if (doc.data().id === id) {
            setDados(doc.data()); // Alterado para definir os dados do documento
            setEmail(doc.data().email)
            setNome(doc.data().nome)
          }
        });
      }
    };
    getDados();
  }, [id]); // Adicione id como dependência

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fazer Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={false}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      /> */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>EDITAR</Text>
      </TouchableOpacity>
    </View>
  );
}
