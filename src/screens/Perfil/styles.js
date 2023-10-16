import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
  gridbutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button1: {
    backgroundColor: "#00A8FF",
    borderRadius: 30,
    padding: 15,
    margin: 10,
    width: 150,
  },
  button2: {
    backgroundColor: "#FFF",
    borderColor: "#00A8FF",
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    margin: 10,
    width: 150,
  },
  buttontext1: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttontext2: {
    color: "#00A8FF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
