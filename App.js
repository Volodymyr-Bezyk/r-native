// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as Font from "expo-font";

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regulat": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
//   });
// };

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       {/* <StatusBar style="auto" /> */}
//     </View>
//   );
// }

import RegistrationScreen from "./src/screens/RegistrationScreen";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrap}>
        <RegistrationScreen></RegistrationScreen>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
