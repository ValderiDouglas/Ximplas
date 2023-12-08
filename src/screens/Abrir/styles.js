import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lista: {
    marginTop: 16,
  },
  foto: {
    backgroundColor: "darkgray",
    marginHorizontal: 16,
    borderRadius: 12,
    height: 200,
  },
  foto1: {
    backgroundColor: "darkgray",
    marginHorizontal: 0,
    borderRadius: 12,
    height: 200,
  },

  box:{
    paddingHorizontal: 20,
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
  local:{
    color: "gray",
    fontSize: 15,
  }
  ,
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});
