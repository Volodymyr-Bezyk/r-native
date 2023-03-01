import { View, Keyboard, TouchableWithoutFeedback, Button } from "react-native";
import { AuthStack } from "~/utils";
import { RegistrationScreen, LoginScreen } from "~/screens/auth";
import { HomeScreen } from "~/screens/main";

const useRoute = (isAuthorized) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default useRoute;
