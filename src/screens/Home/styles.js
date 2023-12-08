import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    maxHeight: 200,
  },
});

export const evento = StyleSheet.create({
  lista: {
    width:200,
  },
  foto: {
    backgroundColor: "darkgray",
    margin:8,
    borderRadius: 6,
    height: 110,
  },
  foto1: {
    backgroundColor: "darkgray",
    margin:0,
    borderRadius: 6,
    height: 110,
  },
  boxtexto: {
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  data: {
    color: "#00A8FF",
    fontSize: 13,
  },
  titulo: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  local: {
    color: "gray",
    fontSize: 15,
  },
});
