import { FontAwesome, Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { db, storage, storageRef } from "~/firebase/config";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadPhotoToFirebase } from "~/utils";
import { useSelector } from "react-redux";
import { selectUserId } from "~/redux/auth/selectors";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [adress, setAdress] = useState("");
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const takePicture = async () => {
    const picture = await camera.takePictureAsync();
    setPhotoUri(picture.uri);
  };

  const sendPicture = async () => {
    const photo = await uploadPhotoToFirebase(photoUri);

    const docRef = await addDoc(collection(db, "posts"), {
      photo,
      name: placeName,
      location: adress,
      likes: 0,
      comments: [],
      coords: location,
      owner: userId,
      createdAt: new Date().toLocaleString(),
    });

    console.log("Document written with ID: ", docRef.id);

    navigation.navigate("Posts", {
      photo: photoUri,
      name: placeName,
      location: adress,
      id: Date.now(),
      coords: location.coords,
      createdAt: location.timestamp,
      coords: location,
    });
    setPhotoUri("");
    setPlaceName("");
    setAdress("");
  };

  const changeSendBtnColor = photoUri && placeName && adress;

  return (
    <View style={styles.container}>
      {!keyboardIsVisible && (
        <>
          <View style={styles.cameraWrap}>
            <Camera style={styles.camera} ref={setCamera}>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: photoUri
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(255, 255, 255, 0.9)",
                }}
                activeOpacity={0.7}
                onPress={takePicture}
              >
                <FontAwesome
                  name="camera"
                  size={24}
                  color={photoUri ? "#FFFFFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
              {photoUri !== "" && (
                <Image source={{ uri: photoUri }} style={styles.photo} />
              )}
            </Camera>
          </View>
          <Text style={{ ...styles.text, color: "#BDBDBD" }}>
            Загрузите фото
          </Text>
        </>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          onChangeText={setPlaceName}
          value={placeName}
          style={{
            ...styles.textInputName,
            fontWeight: placeName ? "500" : "400",
            color: placeName ? "#212121" : "#BDBDBD",
          }}
          placeholder="Название..."
        />

        <View style={styles.locationWrap}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />

          <TextInput
            onChangeText={setAdress}
            value={adress}
            style={{
              ...styles.textInputLocation,
              color: adress ? "#212121" : "#BDBDBD",
            }}
            placeholder="Местность..."
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.sendBtn,
            backgroundColor: changeSendBtnColor ? "#FF6C00" : "#F6F6F6",
          }}
          activeOpacity={0.7}
          disabled={!changeSendBtnColor}
          onPress={sendPicture}
        >
          <Text
            style={{
              ...styles.sendBtnText,
              color: changeSendBtnColor ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {!keyboardIsVisible && (
        <>
          <View style={{ ...styles.tabWrap, borderTopColor: "transparent" }}>
            <TouchableOpacity
              onPress={() => setPhotoUri("")}
              style={{ ...styles.deleteBtnWrap, backgroundColor: "#F6F6F6" }}
              activeOpacity={0.8}
            >
              <Feather
                name="trash-2"
                size={24}
                color={photoUri ? "#FF6C00" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  cameraWrap: {
    overflow: "hidden",
    marginBottom: 8,
    borderRadius: 8,
  },
  camera: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: Dimensions.get("window").height * 0.296,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: Dimensions.get("window").height * 0.296,
    borderWidth: 1,
    borderColor: "red",
  },
  button: {
    width: Dimensions.get("window").height * 0.074,
    height: Dimensions.get("window").height * 0.074,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
  },
  textInputName: {
    paddingVertical: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
  },
  locationWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 32,
  },

  textInputLocation: {
    paddingVertical: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 8,
  },
  sendBtn: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,
    height: 51,
  },
  sendBtnText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  tabWrap: {
    marginTop: "auto",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 9,
    paddingBottom: 34,
  },
  deleteBtnWrap: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 31,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
