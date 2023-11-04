import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
 } from "react-native";
 import React, { useState, useEffect } from "react";
 import { onAuthStateChanged , deleteUser } from "firebase/auth";
 import { styles } from "./styles";
 import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
 import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
 } from "firebase/firestore";
 import { useNavigation } from '@react-navigation/native';
 
 export function EditarPerfil() {
  const [id, setId] = useState(null);
  const [dados, setDados] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
 
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
            setDados(doc.data());
            setEmail(doc.data().email);
            setNome(doc.data().nome);
          }
        });
      }
    };
    getDados();
  }, [id]);
 
  const editar = async () => {
    const db = getFirestore();
    const docRef = doc(db, "users", id);
    const payload = { nome: nome };
    await updateDoc(docRef, payload);
    alert("Dados atualizados");
    navigation.navigate("Perfil");
  };
  
  const user = FIREBASE_AUTH.currentUser;

  const excluir = async () => {
    const db = getFirestore();
    const docRef = doc(db, "users", id);
    
    deleteUser(user).then(() => {
      deleteDoc(docRef);
      alert("Conta excluída");
      navigation.navigate("Login");
    }
    ).catch((error) => {
      console.log(error);
    })};

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={false}
      />
      
      <TouchableOpacity onPress={editar} style={styles.button}>
        <Text style={styles.buttontext}>SALVAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={excluir} style={styles.button2}>
        <Text style={styles.buttontext2}>Excluir conta</Text>
      </TouchableOpacity>
    </View>
  );
}
