import { FontAwesome, Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { CommentsItem } from "~/components/CommentsItem";
import { examples, comments } from "~/constants/index";

export default function CommentsScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={{ uri: examples[0].photo }} style={styles.image} />
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
    paddingVertical: 32,
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
    paddingTop: 32,
    paddingBottom: 114,
  },
});
