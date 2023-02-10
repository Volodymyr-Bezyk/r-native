import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { fonts } from "~/constants";
import { MainStack } from "~/utils";
import { RegistrationScreen, LoginScreen } from "~/screens/auth";
import { HomeScreen } from "~/screens/main";
import ScreenHeader from "~/components/ScreenHeader";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => <ScreenHeader title="Публикации" />,
              }}
            />
          </MainStack.Navigator>
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}
