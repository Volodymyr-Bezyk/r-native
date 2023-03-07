import { StyleSheet, Text, View, Image } from "react-native";
import { dateFormatter } from "~/utils/dateFormatter";

export const CommentsItem = ({
  photo,
  text,
  createdAt,
  navigation,
  index,
  length,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        marginBottom: length - 1 !== index ? 32 : 0,
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
      }}
    >
      <Image
        source={{ uri: photo }}
        style={{
          ...styles.avatar,
          marginRight: index % 2 === 0 ? 16 : 0,
          marginLeft: index % 2 !== 0 ? 16 : 0,
        }}
      />
      <View
        style={{
          ...styles.textWrap,
        }}
      >
        <Text style={styles.text}>
          {index}
          {text}
        </Text>
        <Text
          style={{
            ...styles.textDate,
            textAlign: index % 2 === 0 ? "right" : "left",
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
