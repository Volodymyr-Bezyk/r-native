import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

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
import { authSignOutUser } from "~/redux/auth/authOperations";

import PostItemProfile from "~/components/PostItemProfile";
import {
  selectUserAvatar,
  selectUserEmail,
  selectUserId,
  selectUserLogin,
} from "~/redux/auth/selectors";
import { loadOwnPostsFromDatabase } from "~/firebase/services";
import { uploadPhotoToFirebase } from "~/firebase/services";
import { authUpdateUser } from "~/redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const userId = useSelector(selectUserId);

  const avatar = useSelector(selectUserAvatar);
  const login = useSelector(selectUserLogin);
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    loadOwnPostsFromDatabase(setPosts, userId);
  }, []);

  const handleLogOut = () => {
    dispatch(authSignOutUser());
  };

  const handleAvatar = async (e) => {
    if (avatar) {
      dispatch(authUpdateUser({ photoURL: "" }));
      return;
    }

    await ImagePicker.getMediaLibraryPermissionsAsync(true);
    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const imgLink = await uploadPhotoToFirebase(img.uri);
    dispatch(authUpdateUser({ photoURL: imgLink }));
  };

  return (
    <View style={{ flex: 1 }}>
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
                uri: avatar
                  ? avatar
                  : "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg",
              }}
            />

            <TouchableOpacity
              onPress={handleAvatar}
              style={{
                ...styles.avatarBtn,
                transform: avatar
                  ? [
                      { translateX: 13 },
                      { translateY: -13 },
                      { rotate: "45deg" },
                    ]
                  : [
                      { translateX: 13 },
                      { translateY: -13 },
                      { rotate: "0deg" },
                    ],
                borderColor: avatar ? "#E8E8E8" : "#FF6C00",
              }}
              activeOpacity={0.8}
            >
              <Feather
                name="plus"
                size={16}
                color={avatar ? "#E8E8E8" : "#FF6C00"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogOut}
            style={styles.logoutBtn}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <Text style={styles.title}>{login}</Text>

          <SafeAreaView style={styles.list}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <PostItemProfile navigation={navigation} {...item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    // borderColor: "#FF6C00",
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
