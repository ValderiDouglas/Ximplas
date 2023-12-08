import React from "react";
import { Home } from "../screens/Home/Home";
import { Mapa } from "../screens/Mapa/Mapa";
import { Favoritos } from "../screens/Favoritos/Favoritos";
import { Perfil } from "../screens/Perfil/Perfil";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export function Navegator (){
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Mapa") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Favoritos") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Perfil") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#00A8FF",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: "Página Inicial" }}
        />
        <Tab.Screen
          name="Mapa"
          component={Mapa}
          options={{ title: "Mapa de Eventos" }}
        />
        {/* <Tab.Screen name="Favoritos" component={Favoritos} /> */}
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>

  );
};
