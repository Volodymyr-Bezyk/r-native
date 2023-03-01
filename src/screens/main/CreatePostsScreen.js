import { FontAwesome, Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function CreatePostsScreen({ navigate }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.text}>Загрузите фото</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput style={styles.textInputName} placeholder="Название..." />
        <View style={styles.locationWrap}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            style={styles.textInputLocation}
            placeholder="Местность..."
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.sendBtn} activeOpacity={0.7}>
        <Text style={styles.sendBtnText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  image: {
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: Dimensions.get("window").height * 0.296,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    width: Dimensions.get("window").height * 0.074,
    height: Dimensions.get("window").height * 0.074,
    backgroundColor: "#ffffff",
    // backgroundColor: "rgba(255,255,255,0.3)",
    // opacity: 0.3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  textInputName: {
    paddingVertical: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 51,
  },
  sendBtnText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});
