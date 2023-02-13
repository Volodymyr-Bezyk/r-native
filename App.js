import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { fonts } from "~/constants";
import useRoute from "~/router/router";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) return null;
  const isAuthorized = true;

  return <NavigationContainer>{useRoute(isAuthorized)}</NavigationContainer>;
}
