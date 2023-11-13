import { Camera, CameraType } from "expo-camera";
import { useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Foto({navigation, route}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  const onPhotoTaken = route.params?.onPhotoTaken;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPhotoTaken && onPhotoTaken(photo.uri);
      navigation.navigate("Criar Evento", { photoUrl: photo.uri });
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={tirarFoto}>
            <Text style={styles.text}>Tira Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
