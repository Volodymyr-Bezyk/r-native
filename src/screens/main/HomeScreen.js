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

import { Ionicons } from "@expo/vector-icons";
import { BottomTabsNavigator } from "~/utils";
import CommentsScreen from "./CommentsScreen";
import CreatePublicationScreen from "./CreatePublicationScreen";

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.homePageWrap}>
      <Text>HOME</Text>

      <BottomTabsNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "CreatePublication") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Comments") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <BottomTabsNavigator.Screen
          name="CreatePublication"
          component={CreatePublicationScreen}
        />
        <BottomTabsNavigator.Screen
          name="Comments"
          component={CommentsScreen}
        />
      </BottomTabsNavigator.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  homePageWrap: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
