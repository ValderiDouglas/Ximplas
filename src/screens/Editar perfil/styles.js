import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-start",
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
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 3,
    padding: 15,
    width: 370,
    alignSelf: "center",
    marginBottom: 40,
  },
  button2: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    width: 370,
    alignSelf: "center",
  },
  buttontext: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttontext2: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
});
