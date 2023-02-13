import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { examples } from "~/constants";
import PostItemProfile from "~/components/PostItemProfile";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("~/../assets/images/BG.jpg")}
        style={styles.bg}
      >
        <View style={styles.container}>
          <View style={styles.avatarWrap}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://www.kindpng.com/picc/m/137-1370686_anime-avatar-png-transparent-avatar-gaming-logo-png.png",
              }}
            />
            <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.8}>
              <Feather name="plus" size={16} color="#E8E8E8" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => console.log("LogOUT")}
            style={styles.logoutBtn}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <Text style={styles.title}>Natali Romanova</Text>

          <SafeAreaView style={styles.list}>
            <FlatList
              data={examples}
              renderItem={({ item }) => <PostItemProfile {...item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    paddingTop: 147,
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    letterSpacing: 0.01,
  },
  avatarWrap: {
    width: 120,
    height: 120,
    position: "absolute",
    top: 0,
    left: 0,
    transform: [
      {
        translateX:
          Dimensions.get("window").width / 2 -
          Dimensions.get("window").height * 0.074,
      },
      { translateY: -Dimensions.get("window").height * 0.074 },
    ],
  },
  avatar: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translateX: 13 }, { translateY: -13 }, { rotate: "45deg" }],
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    // borderColor: "#FF6C00",
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },
  logoutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  list: {
    paddingTop: 32,
    paddingBottom: 32,
  },
});
