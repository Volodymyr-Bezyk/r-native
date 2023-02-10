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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ScreenHeader({ title }) {
  return (
    <View style={styles.headerWrap}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    position: "relative",
    height: 88,
    paddingHorizontal: 10,
    paddingTop: Dimensions.get("window").height * 0.055,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    paddingHorizontal: 40,
    paddingVertical: Dimensions.get("window").height * 0.013,

    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,

    color: "#212121",
    textAlign: "center",
  },
  logoutBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
