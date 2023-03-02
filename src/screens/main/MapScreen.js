import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ navigation, route }) {
  if (!route.params || !route.params.coords) {
    console.log("No coordinates in template card");
    return navigation.navigate("Posts", {});
  }

  const { latitude, longitude } = route.params.coords;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        title="Kyiv"
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
