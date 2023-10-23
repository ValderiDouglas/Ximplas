import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
