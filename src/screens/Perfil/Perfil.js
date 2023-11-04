import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

export function Perfil({ navigation }) {
  const [id, setId] = useState(null);
  const [dados, setDados] = useState("");

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
      if (id != null) {
        const db = getFirestore();
        const docRef = doc(db, "users", id); // Alterado para usar o ID do usuário atual
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDados(docSnap.data()); // Alterado para definir os dados do documento
        } else {
          console.log("No such document!");
        }
      }
    };
    getDados();
  }, [id]); // Adicione id como dependência

  const deslogar = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Usuário deslogado");
      navigation.navigate("Perfil");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      {id == null ? (
        <View>
          <Text style={styles.tittle}>
            Faça login ou cadastre-se para ter acesso às suas informações
            pessoais.
          </Text>
          <View style={styles.gridbutton}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttontext1}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("SingUp")}
            >
              <Text style={styles.buttontext2}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.tittle}>{dados.nome}</Text>
          <Text style={styles.descricao}>{dados.email}</Text>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => navigation.navigate("Editar perfil")}
          >
            <Text style={styles.buttontext4}>Editar perfil</Text>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'center', marginBottom: 20}}>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Eventos")}>
            <Text style={styles.buttontext1}>EVENTOS</Text>
          </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity style={styles.button3} onPress={deslogar}>
            <Text style={styles.buttontext3}>Sair da conta</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
