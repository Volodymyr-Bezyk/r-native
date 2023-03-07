import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { CommentsItem } from "~/components/CommentsItem";
import { examples, comments } from "~/constants/index";
import { setCurrentPostId, removeCurrentPostId } from "~/redux/auth/authSlice";
import { getOnePost, pushNewCommentToPost } from "~/firebase/services";

export default function CommentsScreen({ navigation, route }) {
  const [postInfo, setPostInfo] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getOnePost(route.params.id, setPostInfo);
    dispatch(setCurrentPostId({ currentPostId: route.params.id }));

    return () => {
      dispatch(removeCurrentPostId());
    };
  }, [route.params.id]);

  if (!postInfo) return;
  const { photo } = postInfo;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.image} />
        <SafeAreaView style={styles.list}>
          <FlatList
            data={comments}
            renderItem={({ item, index }) => (
              <CommentsItem
                navigation={navigation}
                {...item}
                index={index}
                length={comments.length}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  image: {
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: Dimensions.get("window").height * 0.296,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
  },
});
