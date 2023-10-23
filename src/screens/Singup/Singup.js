import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const Singup = ({navigation}) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const auth = FIREBASE_AUTH;

  const handleSingup = () => {
    if (password !== confirmpassword) {
      alert("Senhas diferentes");
      return;
    } else {
    createUserWithEmailAndPassword(auth, email, password)
    .then(( item ) => {
      const user = item.user;
      console.log("Usuario criado com sucesso");
      addDoc(collection(FIREBASE_DATABASE, "users"), {
        id: user.uid,
        nome: nome,
        email: email,
      });
    })
    .catch((error) => {
      console.log(error);
    });
    }
    navigation.navigate("Perfil")
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fazer Sing up</Text>
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
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry
        value={confirmpassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSingup}>
        <Text style={styles.buttontext}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "lightgray",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#00A8FF",
    borderRadius: 30,
    padding: 15,
    width: 150,
    alignSelf: "center",
  },
  buttontext: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
