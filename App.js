import * as React from "react";

import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Navegator } from "./src/navigation/index";
import { Login } from "./src/screens/Login/Login";
import { Singup } from "./src/screens/Singup/Singup";
import { EditarPerfil } from "./src/screens/Editar perfil/EditarPerfil";
import { Eventos } from "./src/screens/Eventos/Eventos";
import { CreateEvento } from "./src/screens/CreateEventos/CreateEventos";
import { Foto } from "./src/screens/Camera/Foto";

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
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Criar Evento" component={CreateEvento} />
        <Stack.Screen name="Foto" component={Foto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
