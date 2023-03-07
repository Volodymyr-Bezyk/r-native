import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import PostItem from "~/components/PostItem";
import { loadPostsFromDatabase } from "~/firebase/services";
import {
  selectUserAvatar,
  selectUserLogin,
  selectUserEmail,
} from "~/redux/auth/selectors";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const avatar = useSelector(selectUserAvatar);
  const login = useSelector(selectUserLogin);
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    loadPostsFromDatabase(setPosts);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar
              ? avatar
              : "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg",
          }}
        />

        <View>
          <Text style={styles.textName}>{login}</Text>
          <Text style={styles.textMail}>{email}</Text>
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
  imageWrap: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    minHeight: 60,
    borderRadius: 16,
  },
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
