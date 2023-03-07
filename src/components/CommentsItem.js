import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { dateFormatter } from "~/utils/dateFormatter";
import { useSelector } from "react-redux";
import { selectUserId } from "~/redux/auth/selectors";

export const CommentsItem = ({
  avatar,
  comment,
  createdAt,
  owner,
  navigation,
  index,
  length,
}) => {
  const userId = useSelector(selectUserId);
  console.log("owner", owner);
  console.log("userId", userId);

  return (
    <View
      style={{
        ...styles.container,
        marginBottom: length - 1 !== index ? 32 : 0,
        flexDirection: owner !== userId ? "row" : "row-reverse",
      }}
    >
      <Image
        source={{
          uri: avatar
            ? avatar
            : "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg",
        }}
        style={{
          ...styles.avatar,
          marginRight: owner !== userId ? 16 : 0,
          marginLeft: owner === userId ? 16 : 0,
        }}
      />
      <View
        style={{
          ...styles.textWrap,
        }}
      >
        <Text style={styles.text}>
          {index}
          {comment}
        </Text>
        <Text
          style={{
            ...styles.textDate,
            textAlign: "left",
            textAlign: owner !== userId ? "right" : "left",
          }}
        >
          {dateFormatter(createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  textWrap: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexShrink: 1,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  textDate: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
