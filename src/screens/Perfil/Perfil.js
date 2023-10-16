import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Perfil({ navigation }) {
  return (
    <>
      <View style={styles.container}>
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
    </>
  );
}
