import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function tabBarButtons(routeName, navigation) {
  const mainRoute =
    routeName === "Posts" ||
    routeName === "Registration" ||
    routeName === "Login";

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (mainRoute) {
    return (
      <View style={styles.tabWrap}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Posts", {
              screen: "Posts",
              params: { userId: "e2ee4" },
            })
          }
          style={styles.btnWrap}
          activeOpacity={0.8}
        >
          <Feather name="grid" size={24} color="#212121" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Create", {
              screen: "Create",
              params: { userId: "e2ee4" },
            })
          }
          style={styles.centerBtnWrap}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              screen: "Profile",
              params: { userId: "e2ee4" },
            })
          }
          style={styles.btnWrap}
          activeOpacity={0.8}
        >
          <Feather name="user" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
    );
  }
  if (routeName === "Profile") {
    return (
      <View style={styles.tabWrap}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Posts", {
              screen: "Posts",
              params: { userId: "e2ee4" },
            })
          }
          style={styles.btnWrap}
          activeOpacity={0.8}
        >
          <Feather name="grid" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              screen: "Profile",
              params: { userId: "e2ee4" },
            })
          }
          style={styles.centerBtnWrap}
          activeOpacity={0.8}
        >
          <Feather name="user" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrap}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Create", {
              screen: "Create",
              params: { userId: "e2ee4" },
            })
          }
        >
          <Feather name="plus" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
    );
  }

  if (routeName === "Create") {
    if (keyboardVisible) return;

    return (
      <View style={{ ...styles.tabWrap, borderTopColor: "transparent" }}>
        <TouchableOpacity
          onPress={() => console.log("Delete Post")}
          style={{ ...styles.centerBtnWrap, backgroundColor: "#F6F6F6" }}
          activeOpacity={0.8}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabWrap: {
    height: 83,
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
    backgroundColor: "#FFFFFF",
    paddingTop: 9,
  },
  centerBtnWrap: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 31,

    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },

  btnWrap: {
    paddingHorizontal: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
  },
});
