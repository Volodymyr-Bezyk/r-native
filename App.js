import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";

import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular":
      "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    "Roboto-Medium":
      "https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap",
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrap}>
        <RegistrationScreen></RegistrationScreen>
        {/* <LoginScreen></LoginScreen> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
