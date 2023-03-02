import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import PostItem from "~/components/PostItem";
import { examples } from "~/constants";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState(examples);
  console.log(route.params);
  useEffect(() => {
    if (route.params) {
      const { name, photo, location } = route.params;
      if (name && photo && location) {
        setPosts((prevS) => [route.params, ...prevS]);
      }
    }

    return () => {};
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://www.kindpng.com/picc/m/137-1370686_anime-avatar-png-transparent-avatar-gaming-logo-png.png",
          }}
        />
        <View>
          <Text style={styles.textName}>Natali Romanova</Text>
          <Text style={styles.textMail}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem navigation={navigation} {...item} />
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  imageWrap: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 60, height: 60, borderRadius: 16, marginRight: 8 },
  textName: {
    fontFamily: "Roboto-Medium",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  textMail: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
