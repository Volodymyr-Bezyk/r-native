import { Feather } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";

export default function PostItemProfile({
  location,
  name,
  photo,
  comments,
  likes,
}) {
  console.log(photo);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }}></Image>
      <Text style={styles.textName}>{name}</Text>
      <View style={styles.locationWrap}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="message-circle" size={24} color="#FF6C00" />
          <Text style={styles.textLikes}>{comments}</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 24 }}
        >
          <Feather name="thumbs-up" size={24} color="#FF6C00" />
          <Text style={styles.textLikes}>{likes}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.textLocation}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  image: {
    flex: 1,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  textName: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textTransform: "capitalize",
  },
  locationWrap: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  textLocation: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  textLikes: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
