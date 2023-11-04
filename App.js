import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Navegator } from "./src/navigation/index";
import { Login } from "./src/screens/Login/Login";
import { Singup } from "./src/screens/Singup/Singup";
import { EditarPerfil } from "./src/screens/Editar perfil/EditarPerfil";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Base"
          component={Navegator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SingUp" component={Singup} />
        <Stack.Screen name="Editar perfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
