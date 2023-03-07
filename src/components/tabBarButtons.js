import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Feather, AntDesign } from "@expo/vector-icons";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TextInput,
} from "react-native";

import {
  selectCurrentPostId,
  selectUserAvatar,
  selectUserId,
} from "~/redux/auth/selectors";

import { pushNewCommentToPost } from "~/firebase/services";

export default function tabBarButtons(routeName, navigation, other) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [comment, setComment] = useState("");
  const currentPostId = useSelector(selectCurrentPostId);
  const userId = useSelector(selectUserId);
  const ownerAvatar = useSelector(selectUserAvatar);
  const mainRoute = !routeName || routeName === "Posts";

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

  const handleComment = async () => {
    const commentItem = {
      id: Date.now(),
      comment,
      owner: userId,
      avatar: ownerAvatar,
      createdAt: new Date().toLocaleString(),
    };
    await pushNewCommentToPost(currentPostId, commentItem);
    setComment("");
    console.log("commentItem", commentItem);
  };

  if (mainRoute) {
    return (
      <View style={styles.tabWrap}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Posts", {
              screen: "Posts",
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
            })
          }
        >
          <Feather name="plus" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
    );
  }

  if (routeName === "Comments") {
    return (
      <View style={styles.commentsContainer}>
        <TextInput
          style={styles.commentsInput}
          placeholder="Комментировать..."
          onChangeText={setComment}
        ></TextInput>
        <TouchableOpacity
          style={styles.commentsBtn}
          activeOpacity={0.7}
          onPress={handleComment}
        >
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
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
  commentsContainer: {
    height: 82,
    padding: 16,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  commentsInput: {
    marginTop: "auto",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 58,
  },
  commentsBtn: {
    position: "absolute",
    width: 34,
    height: 34,
    top: 24,
    right: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    border: 0,
  },
});
